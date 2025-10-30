import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../service/chat.service';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { GitPullRequestDraftIcon } from 'lucide-angular';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  selectedChatId: string = '';
  messageText: string = '';
  searchQuery: string = '';
  chatDetails: any[] = [];
  chatHistory: any[] = [];
  navigatedBusiness: any;
  connectionStatus: string = 'Connecting...';

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.navigatedBusiness = navigation?.extras.state?.['business'];
  }

  ngOnInit() {
    const userId = this.authService.currentUser().UserId;

    // ✅ Start SignalR connection
    this.chatService.startConnection(userId);

    // ✅ Listen for connection events
    this.chatService['hubConnection'].onreconnecting(() => this.connectionStatus = 'Reconnecting...');
    this.chatService['hubConnection'].onreconnected(() => this.connectionStatus = 'Connected');
    this.chatService['hubConnection'].onclose(() => this.connectionStatus = 'Disconnected');
    this.connectionStatus = 'Connected';

    // ✅ Listen for real-time messages
    this.chatService.onReceiveMessage((senderId, message, sentAt) => {
      // Only show message if current chat is active
      if (this.selectedChatId === senderId) {
        this.chatHistory.push({
          senderId,
          receiverId: userId,
          message,
          sentAt,
          sender: 'business'
        });
      } else {
        // Optional: mark unread for other chats
        const chat = this.chatDetails.find(c => c.receiverId === senderId);
        if (chat) chat.unread = (chat.unread || 0) + 1;
      }
    });

    // ✅ Load initial user chats
    this.getAllUsers();
  }

  /** Fetch chat users */
  getAllUsers() {
    const userId = this.authService.currentUser().UserId;
    this.chatService.getAllBusinessUsers(userId).subscribe((res: any) => {
      if (res.status) {
        this.chatDetails = res.data;
      }

      // If navigated from a business profile, auto-open chat
      if (this.navigatedBusiness) {
        const isOwnerInReceiver = this.chatDetails.some(
          item => item.receiverId === this.navigatedBusiness.ownerUserId
        );
        if (!isOwnerInReceiver) {
          this.chatDetails.push({
            business: this.navigatedBusiness,
            receiverId: this.navigatedBusiness.ownerUserId,
            lastMessage: {}
          });
        }
        this.selectChat(this.navigatedBusiness.ownerUserId);
      }
    });
  }

  /** Fetch chat history */
  getAllUsersChats(senderId: string, receiverId: string) {
    this.chatService.getAllBusinessChats(senderId, receiverId).subscribe((res: any) => {
      if (res.status) {
        this.chatHistory = res.data.chatHistory || [];
      }
    });
  }

  /** Select a chat */
  selectChat(id: string): void {
    this.selectedChatId = id;
    this.getAllUsersChats(this.authService.currentUser().UserId, id);
  }

  /** Filter search results */
filteredConversations(): any[] {
  if (!this.searchQuery.trim()) return this.chatDetails;

  const query = this.searchQuery.toLowerCase();

  return this.chatDetails.filter((conv: any) => {
    if (conv.business) {
      return conv.business.businessName?.toLowerCase().includes(query);
    } else if (conv.userInfo) {
      const fullName = conv.userInfo.name.trim().toLowerCase();
      return fullName.includes(query);
    }
    return false;
  });
}


  /** Send message through SignalR */
async sendMessage(): Promise<void> {
  if (!this.messageText.trim()) return;

  const senderId = this.authService.currentUser().UserId;
  const receiverId = this.selectedChatId;
  const message = this.messageText.trim();

  // Push message locally
  this.chatHistory.push({
    senderId,
    receiverId,
    message,
    sentAt: new Date().toISOString(),
    sender: 'user'
  });

  try {
    await this.chatService.sendMessage(senderId, receiverId, message);
  } catch (err) {
    console.error('💥 Error sending message:', err);
  }

  this.messageText = '';
}


  /** Trigger message on Enter key */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.sendMessage();
  }

  /** Get initials for avatar */
  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .filter(part => part.trim() !== '')
      .map(part => part[0].toUpperCase())
      .join('');
  }

  /** Get selected conversation details */
  selectedConversation(): any {
    return this.chatDetails.find((c: any) => c.receiverId === this.selectedChatId);
  }
}
