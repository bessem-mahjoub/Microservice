import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/User';
import { WebSocketService } from 'src/app/services/WebSocket.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  public currentUserId : number = 0
  notifications: any[] = [];
  public notificationcount:number=0 ;
  constructor(private notificationService: WebSocketService, private router: Router) { }
  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('currentUser')!) as User
      this.currentUserId = user.id!;
    this.notificationService.listen(notif => {
      this.notifications.push(notif);
      if (notif.receiver.id==this.currentUserId){
          this.notificationcount=this.notifications.length/2;
      }
      console.log(notif)
    });
  }
  redirectToTask() {
    if (this.currentUserId === 1) {
      this.router.navigate(['/ui-components/taskstudent']);
    } else if (this.currentUserId === 2) {
      this.router.navigate(['/ui-components/requests']);
    }
}
}
