import { WebSocketService } from './../../../services/WebSocket.service';
import { webSocket } from 'rxjs/webSocket';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/core/ChatMessage';
import { ChatService } from 'src/app/services/Chat.service';
import { User } from 'src/app/core/User';

@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: ChatMessage[] = [];

  chatText: string;
  chatForm: any;
  currentUserId = 0;
  constructor(private chatservice:ChatService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
this.chatForm = this.formBuilder.group({
  message: ['', Validators.required]
})
    var user = JSON.parse(localStorage.getItem('currentUser')!) as User
    this.currentUserId = user.id!;
    this.chatservice.listen(chaters => {
          this.chats.push(chaters);
          console.log(this.chats);
        });
      }

  add(): void {
    const chatmem= {
      text: this.chatForm.value.message!,
      senderId:this.currentUserId,
      receiverId:1,
      timestamp: new Date()
    };
    console.log(chatmem);
    this.chatservice.send(chatmem);
  }
notify(): void {

}
}
