import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/core/Response';
import { ResponseService } from 'src/app/services/response.service';
import { Complaint, TypeRec } from 'src/app/core/Complaint';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { timeout } from 'rxjs';
import { SatisfactionLevel } from 'src/app/core/SatisfactionLevel';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})

export class ResponseComponent {

  showDropdown: boolean = false;
  complaints: Complaint[]=[];
  responses: Response[]=[];
  responseId: number;
  complaintForm:any
  filterShearch='';
  note: SatisfactionLevel;
  description: string;
  dataSource :any;
  displayedColumns: string[] = [
    'message','note','responseDate','noteAction'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(    private snackBar: MatSnackBar  // Injecter MatSnackBar ici
  ,private complaintService: ComplaintService,private responseService: ResponseService, private router: Router, public dialog: MatDialog,private fb: FormBuilder,private route: ActivatedRoute) { }
  ngOnInit() {
    this.getResponse();
    //this.getComplaint();
    };

getComplaint(){
  this.complaintService.getComplaintByUserId(2).subscribe(
    complaints => {
      
      this.complaints = complaints;
      this.dataSource = new MatTableDataSource(complaints);
      this.dataSource.paginator = this.paginator;

    },
    error => {
      console.error('Error fetching Complaints:', error);
    }
  );
}

getResponse(){
  this.responseService.getResponseByUserId(2).subscribe(
    responses => {
      this.responses = responses;
      this.dataSource = new MatTableDataSource(responses);
      this.dataSource.paginator = this.paginator;

    },
    error => {
      console.error('Error fetching Complaints:', error);
    }
  );
}



giveNote(idRep: number, note: string) {
    this.responseService.giveNote(idRep, note).subscribe(
      next => {
        console.log(next);
      },
      error => {
        console.log(error);
      }
    );
}
  applyFilter() {
    
    this.dataSource.filter = this.filterShearch.trim().toLowerCase();
  }
}
