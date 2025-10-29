import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../service/chat.service';
import { AuthService } from '../../service/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent {
  selectedChatId: number = 1;
  messageText: string = '';
  searchQuery: string = '';
  chatDetails: any[] = [];
  chatHistory: any;
  navigatedBusiness: any;

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.navigatedBusiness = navigation?.extras.state?.['business'];
    
  }
  
  ngOnInit() {
    console.log(this.navigatedBusiness);
    this.getAllUsers();
  }

  getAllUsers() {
    this.chatService.getAllBusinessUsers(this.authService.currentUser().UserId).subscribe((res: any) => {
      if (res.status) {
        this.chatDetails = res.data;
        console.log(this.chatDetails);
        
      }
      if(this.navigatedBusiness) {
        const isOwnerInReceiver = this.chatDetails.some(item => item.receiverId === this.navigatedBusiness.ownerUserId);
        if(isOwnerInReceiver) {
          this.selectChat(this.navigatedBusiness.ownerUserId);
        } else {
          this.chatDetails.push({business: this.navigatedBusiness, receiverId: this.navigatedBusiness.ownerUserId, lastMessage: {} })
          this.selectChat(this.navigatedBusiness.ownerUserId);
        }
      }
    })
  }

  getAllUsersChats(senderId: any, receiverId: any) {
    this.chatService.getAllBusinessChats(senderId, receiverId).subscribe((res: any) => {
      if (res.status) {
        this.chatHistory = res.data.chatHistory;
      }
    })
  }

  selectChat(id: number): void {
    this.selectedChatId = id;
    this.getAllUsersChats(this.authService.currentUser().UserId, id);
  }

  selectedConversation(): any {    
    return this.chatDetails.find((c: any) => c.receiverId === this.selectedChatId);
  }

  filteredConversations(): any[] {
    if (!this.searchQuery.trim()) {
      return this.chatDetails;
    }
    return this.chatDetails.filter((conv: any) =>
      conv.businessName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sendMessage(): void {
    if (this.messageText.trim()) {
      // Add message logic here
      this.messageText = '';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .filter(part => part.trim() !== '')
      .map(part => part[0].toUpperCase())
      .join('');
  }
}
