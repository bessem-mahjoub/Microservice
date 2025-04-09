import { MonitoringNoteService } from 'src/app/services/MonitoringNote.service';
import { Status } from './../../../../../../core/Status.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MonitoringNote } from 'src/app/core/MonitoringNote';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurnIn } from 'src/app/core/TurnIn';

@Component({
  selector: 'app-Addmonitoring',
  templateUrl: './Addmonitoring.component.html',
  styleUrls: ['./Addmonitoring.component.css']
})
export class AddmonitoringComponent implements OnInit {
  monitoring: MonitoringNote[];
  turnId: number;
  id: number;
  submissionDate: Date;
  comment: string = '';
  statusOptions: Status[] = Object.values(Status);
  monitoringForm: FormGroup;
  constructor(
    private router: Router,
    private monitoringnoteservice: MonitoringNoteService,
    public dialogRef: MatDialogRef<AddmonitoringComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { turnId: number }
  ) {
    this.monitoringForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(3)]],
      grade: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.turnId = this.data.turnId;
    console.log("jawo behy " + this.turnId);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submitMonitoringNote(): void {
    if (this.monitoringForm.valid) {
      const monitoringNote: MonitoringNote = {
        submissionDate: new Date(),
        comment: this.monitoringForm.value.comment,
        grade: this.monitoringForm.value.grade,
        turnIn: { id: this.turnId } as TurnIn,
        status: this.monitoringForm.value.status
      };
      console.log(monitoringNote);
      this.monitoringnoteservice.createMonitoringNote(monitoringNote).subscribe(
        (createdNote: MonitoringNote) => {
          console.log('Monitoring note created:', createdNote);
          this.dialogRef.close();
          this.snackBar.open('Monitoring note created successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        (error: any) => {
          console.error('Error creating monitoring note:', error);
          this.snackBar.open('Error creating monitoring note', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }
}
