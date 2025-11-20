import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { FixedRoutes, Modules } from '../app.url';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = 'https://localhost:7257/chatHub'; // ✅ must match backend MapHub route

  constructor(private http: HttpClient) {}

  async startConnection(userId: string) {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      console.log('⚡ Already connected');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}?userId=${userId}`, {
        transport: signalR.HttpTransportType.WebSockets, // ✅ force WebSocket
        withCredentials: true
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      console.log('✅ SignalR connected for user:', userId);
    } catch (err) {
      console.error('❌ SignalR connection error:', err);
    }
  }

  async sendMessage(senderId: string, receiverId: string, message: string) {
    if (!this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      console.warn('⚠️ Hub not connected yet, waiting...');
      await this.startConnection(senderId); // reconnect if lost
    }

    return this.hubConnection
      .invoke('SendMessage', senderId, receiverId, message)
      .then(() => console.log('✅ Message sent successfully'))
      .catch((err: any) => console.error('❌ Error sending message:', err));
  }

  public onReceiveMessage(callback: (senderId: string, message: string, sentAt: string) => void) {
    if (!this.hubConnection) return;
    this.hubConnection.on('ReceiveMessage', callback);
  }

  getAllBusinessUsers(senderId: any) {
    return this.http.get(
      `${Modules.Base}${FixedRoutes.ChatMessage.Chat}/${FixedRoutes.ChatMessage.GetAllChatsForUser}?senderId=${senderId}`
    );
  }

  getAllBusinessChats(senderId: any, receiverId: any) {
    return this.http.get(
      `${Modules.Base}${FixedRoutes.ChatMessage.Chat}/${FixedRoutes.ChatMessage.GetChatBetweenUsers}?senderId=${senderId}&receiverId=${receiverId}`
    );
  }
}
