import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/core/Task';
import { WebsocketService } from 'src/app/services/Websocket.service';

@Component({
  selector: 'app-taskweb',
  templateUrl: './taskweb.component.html',
  styleUrls: ['./taskweb.component.css']
})
export class TaskwebComponent implements OnInit {

  title = 'real-dashboard-client';

  tasks: Task[] = [];

  formtt: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    days: new FormControl<number>(0 , Validators.required)
  });

  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.listen(task => {
      this.tasks.push(task);
    });
  }

  add(name: string, days: number): void {
    const task: Task = {
      name: name,
      days: days
    };
    this.webSocketService.send(task);
  }

  click(): void{
    this.add(this.formtt.value.name, this.formtt.value.days);
    this.formtt.reset({});
  }


}
