import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TurnIn } from 'src/app/core/TurnIn';
import { MonitoringNoteService } from 'src/app/services/MonitoringNote.service';
import { TurnInService } from 'src/app/services/TurnIn.service';
import { AddmonitoringComponent } from './Addmonitoring/Addmonitoring.component';
@Component({
  selector: 'app-turnIns',
  templateUrl: './turnIns.component.html',
  styleUrls: ['./turnIns.component.css']
})
export class TurnInsComponent implements OnInit {
  turns: TurnIn[];
  taskId: number;
  constructor(
    private tuninservice : TurnInService,
    private router: Router,
    private monitoringNoteService: MonitoringNoteService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.fetchTurnIn();
    console.log("jawo behy " + this.taskId);
  }
  fetchTurnIn(): void {
    this.tuninservice.getAllTurnIns().subscribe(
      turns => {
        this.turns = turns;
      },
      error => {
        console.error('Error fetching turns:', error);
      }
    );
  }
  openMonitoringDialog(turnId : number): void {
    const dialogRef = this.dialog.open(AddmonitoringComponent, {
      data: { turnId: turnId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`monitoring In ${result}`);
      this.fetchTurnIn();
    });
  }
}
