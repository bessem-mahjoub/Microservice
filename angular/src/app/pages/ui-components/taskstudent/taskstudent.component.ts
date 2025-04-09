import { saveAs } from 'file-saver';
import { Component } from '@angular/core';
import { Task } from 'src/app/core/Task';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../task/add-task/add-task.component';
import { UpdateTaskComponent } from '../task/update-task/update-task.component';
import { AddturninComponent } from './addturnin/addturnin.component';


@Component({
  selector: 'app-task',
  templateUrl: './taskstudent.component.html',
  styleUrls: ['./taskstudent.component.css']
})
export class TaskstudentComponent {
  tasks: Task[];

  constructor(private taskService: TaskService, private router: Router, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  downloadAttachment(taskId: number, attachmentFileName?: string): void {
    if (attachmentFileName) {
      this.taskService.downloadTaskFile(taskId, attachmentFileName).subscribe(
        data => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          saveAs(blob, attachmentFileName);
        },
        error => {
          console.error('Error downloading attachment:', error);
          if (error.status === 404) {
            console.error('Attachment not found');
          } else {
            console.error('Unknown error occurred');
          }
        }
      );
    } else {
      console.error('Attachment file name is undefined');
    }
  }
  openTurnInDialog(taskId : number): void {
    const dialogRef = this.dialog.open(AddturninComponent, {
      data: { taskId: taskId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Turned In ${result}`);
      this.fetchTasks();
    });
  }
  
}
