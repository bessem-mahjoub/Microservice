import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Notifications, iNotifications } from '../core/Notifications';


export type ListenerCallBack = (message: iNotifications) => void;


@Injectable({
  providedIn: "root",
})
export class WebSocketService implements OnDestroy{

  private connection: CompatClient | undefined = undefined;

  private subscription: StompSubscription | undefined;

  constructor() {
    this.connection = Stomp.client('ws://localhost:8081/websocket');
    this.connection.connect({}, () => {});
  }
  sendNotification(notif: any) {
    if (this.connection && this.connection.connected) {
      this.connection.send('/app/notification', {}, JSON.stringify(notif));
      console.log(JSON.stringify(notif))
    } else {
      console.error('WebSocket connection is not established.');
    }
  }
  public listen(fun: ListenerCallBack): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe('/topic/notification', message => fun(JSON.parse(message.body)));
      });
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
