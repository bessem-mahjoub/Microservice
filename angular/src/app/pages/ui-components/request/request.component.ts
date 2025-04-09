import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/core/Request';
import { Offer } from 'src/app/core/Offer';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  req: Request[];
  offers : Offer[];
  constructor(private requestService: RequestService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.requestService.getAllrequests().subscribe(
       req => {
        this.req = req
      },
      error => {
        console.error('Error fetching requests:', error);
      }
    );
  }
}
