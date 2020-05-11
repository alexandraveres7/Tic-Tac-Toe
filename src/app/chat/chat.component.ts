import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  message: string;

  constructor(private chatService: ChatService) { }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
