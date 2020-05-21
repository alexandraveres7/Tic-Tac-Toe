import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';
import * as moment from 'moment';
import { distinctUntilChanged, filter, throttleTime, scan } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) { }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.chatService
      .getMessages().pipe(
      distinctUntilChanged(),
      filter((message) => message.trim().length > 0),
      throttleTime(1000),
      scan((acc: string, message: string, index: number) => `${message}(${index + 1})`, '')
    )
      .subscribe((message: string) => {
        const currentTime = moment().format('hh:mm:ss a');
        const messageWithTimestamp = `${currentTime}: ${message}`;
        this.messages.push(messageWithTimestamp);
      });
  }

}
