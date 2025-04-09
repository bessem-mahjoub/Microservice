import { StompSubscription } from '@stomp/stompjs/src/stomp-subscription';
import { CompatClient, Stomp } from '@stomp/stompjs';

import { Injectable, OnDestroy } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessage } from '../core/ChatMessage';

export type ListenerCallBack = (message: ChatMessage) => void;

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy{

  private connection: CompatClient | undefined = undefined;

  private subscription: StompSubscription | undefined;

  constructor() {
    this.connection = Stomp.client('ws://localhost:8081/websocket');
    this.connection.connect({}, () => {});
  }

  public send(chat: any): void {
    // if (this.connection && this.connection.connected) {
      this.connection?.send('/app/add_new_chat', {}, JSON.stringify(chat));
    // }
  }
  public listen(fun: ListenerCallBack): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe('/topic/added_chat', message => fun(JSON.parse(message.body)));
      });
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
