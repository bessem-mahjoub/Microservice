import { WebSocketService } from 'src/app/services/WebSocket.service';
import { TaskService } from 'src/app/services/task.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/core/Task';
import { User } from 'src/app/core/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notifications } from 'src/app/core/Notifications';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  taskId: number;
  taskDescription: string = '';
  progress: string = '';
  duration: string = '';
  supervisorId: number = 2;
  studentId: number = 1;
  selectedFile: File;
  taskForm: FormGroup;
  constructor(
    private router: Router,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private notificationservice : WebSocketService
  ) {
    this.taskForm = this.formBuilder.group({
      taskDescription: ['', [Validators.required, Validators.minLength(3)]],
      progress: ['', [Validators.required, Validators.minLength(3)]],
      duration: ['', [Validators.required, Validators.minLength(3)]],
      supervisorId: [2],
      attachment: [null],
      studentId: [1]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTask(): void {
    if (this.taskForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('task', JSON.stringify({
        id: this.taskId,
        taskDescription: this.taskForm.value.taskDescription,
        progress: this.taskForm.value.progress,
        duration: this.taskForm.value.duration,
        supervisor: { id: this.taskForm.value.supervisorId } as User,
        student: { id: this.taskForm.value.studentId } as User,
      }));

      this.taskService.createTask(formData).subscribe(
        (response) => {
          console.log('Task added successfully:', response);
          this.router.navigate(['/ui-components/task']);
          this.dialogRef.close();
          this.snackBar.open('Task added successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
      const notifys= {
        description: 'You have a new task to do',
          senderId: this.taskForm.value.supervisorId,
          receiverId: this.taskForm.value.studentId
        };
        this.notificationservice.sendNotification(notifys);
    }


  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

}
