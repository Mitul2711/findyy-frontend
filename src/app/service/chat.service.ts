import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { FixedRoutes, Modules } from '../app.url';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = 'https://localhost:7257/chatHub';

  constructor(private http: HttpClient) { }

  public startConnection(userId: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}?userId=${userId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.error('SignalR connection error:', err));
  }

  public sendMessage(senderId: string, receiverId: string, message: string) {
    return this.hubConnection.invoke('SendMessage', senderId, receiverId, message);
  }

  public onReceiveMessage(callback: (senderId: string, message: string, sentAt: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  getAllBusinessUsers(senderId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.ChatMessage.Chat}/${FixedRoutes.ChatMessage.GetAllChatsForUser}?senderId=${senderId}`);
  }

  
  getAllBusinessChats(senderId: any, receiverId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.ChatMessage.Chat}/${FixedRoutes.ChatMessage.GetChatBetweenUsers}?senderId=${senderId}&receiverId=${receiverId}`);
  }

}
