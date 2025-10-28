import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  type: string;
  rating: number;
  location: string;
}

interface Message {
  id: number;
  sender: 'business' | 'user';
  text: string;
  time: string;
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})

export class ChatComponent {
  selectedChatId: number = 1;
  messageText: string = '';
  searchQuery: string = '';

  conversations: Conversation[] = [
    {
      id: 1,
      name: "John's Plumbing Services",
      lastMessage: "Yes, I can help you with that. When would you like me to visit?",
      time: "2m ago",
      unread: 2,
      avatar: "JP",
      online: true,
      type: "Business Owner",
      rating: 4.8,
      location: "2.3 km away"
    },
    {
      id: 2,
      name: "Sarah's Bakery",
      lastMessage: "Thank you for your interest! Our cakes start from ₹500",
      time: "15m ago",
      unread: 0,
      avatar: "SB",
      online: true,
      type: "Business Owner",
      rating: 4.9,
      location: "1.5 km away"
    },
    {
      id: 3,
      name: "Mike's Carpentry",
      lastMessage: "I'll send you the quotation by evening",
      time: "1h ago",
      unread: 0,
      avatar: "MC",
      online: false,
      type: "Business Owner",
      rating: 4.7,
      location: "3.8 km away"
    },
    {
      id: 4,
      name: "Ravi's Electricals",
      lastMessage: "Sure, I'm available tomorrow at 10 AM",
      time: "3h ago",
      unread: 1,
      avatar: "RE",
      online: false,
      type: "Business Owner",
      rating: 4.6,
      location: "4.2 km away"
    },
    {
      id: 5,
      name: "Priya's Tiffin Service",
      lastMessage: "We deliver fresh meals daily. Would you like to subscribe?",
      time: "5h ago",
      unread: 0,
      avatar: "PT",
      online: false,
      type: "Business Owner",
      rating: 4.9,
      location: "0.8 km away"
    }
  ];

  messages: Message[] = [
    {
      id: 1,
      sender: "business",
      text: "Hello! How can I help you today?",
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "user",
      text: "Hi! I need a plumber for my kitchen sink. It's been leaking for a few days.",
      time: "10:32 AM"
    },
    {
      id: 3,
      sender: "business",
      text: "I can definitely help with that. Can you tell me more about the issue?",
      time: "10:33 AM"
    },
    {
      id: 4,
      sender: "user",
      text: "The pipe under the sink is leaking. Also, the water pressure seems low.",
      time: "10:35 AM"
    },
    {
      id: 5,
      sender: "business",
      text: "Got it. I can come and check it out. Are you available this evening around 5 PM?",
      time: "10:36 AM"
    },
    {
      id: 6,
      sender: "user",
      text: "Yes, that works for me. What would be the estimated cost?",
      time: "10:38 AM"
    },
    {
      id: 7,
      sender: "business",
      text: "Yes, I can help you with that. When would you like me to visit?",
      time: "10:40 AM"
    }
  ];

  selectChat(id: number): void {
    this.selectedChatId = id;
  }

  selectedConversation(): Conversation | undefined {
    return this.conversations.find(c => c.id === this.selectedChatId);
  }

  filteredConversations(): Conversation[] {
    if (!this.searchQuery.trim()) {
      return this.conversations;
    }
    return this.conversations.filter(conv =>
      conv.name.toLowerCase().includes(this.searchQuery.toLowerCase())
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
}

// To use this component:
// 1. Import it in your module or parent component
// 2. Add to template: <app-chat></app-chat>