import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/Task';
import { TurnIn } from 'src/app/core/TurnIn';
import { User } from 'src/app/core/User';
import { TurnInService } from 'src/app/services/TurnIn.service';

@Component({
  selector: 'app-addturnin',
  templateUrl: './addturnin.component.html',
  styleUrls: ['./addturnin.component.css']
})
export class AddturninComponent implements OnInit {
  turnin: TurnIn[];
  taskId: number;
  id: number;
  submissionDate: Date;
  comment: string = '';
  attachmentFileName: string = '';
  supervisor: number = 2;
  student: number = 1;
  selectedFile: File;
  turnInForm: FormGroup;
  constructor(
    private router: Router,
    private turnInService: TurnInService,
    public dialogRef: MatDialogRef<AddturninComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number }
  ) {
    this.turnInForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(3)]],
      attachment: [null],
      student: [1],
      supervisor: [2]
    });
  }

  ngOnInit() {
    this.taskId = this.data.taskId;
    console.log("jawo behy " + this.taskId);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addTurnIn(): void {
    if (this.turnInForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('turnIn', JSON.stringify({
        comment: this.turnInForm.value.comment,
        attachmentFileName: this.selectedFile.name,
        student: { id: this.turnInForm.value.student } as User,
        supervisor: { id: this.turnInForm.value.supervisor } as User,
        task: { id: this.taskId } as Task,
      }));
      this.turnInService.submitTurnIn(formData).subscribe(
        (response) => {
          console.log('Turn-in submitted successfully:', response);
          this.router.navigate(['/ui-components/taskstudent']);
          this.dialogRef.close();
          this.snackBar.open('Turn-in submitted successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        (error) => {
          console.error('Error submitting turn-in:', error);
        }
      );
    }
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
