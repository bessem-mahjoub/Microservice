import { Component, OnInit, ViewChild } from '@angular/core';
import { Complaint } from 'src/app/core/Complaint';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintService } from 'src/app/services/complaint.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ComplaintDialogComponent } from './complaint-dialog/complaint-dialog.component';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  dataSource: MatTableDataSource<Complaint> = new MatTableDataSource<Complaint>([]);
  complaints: Complaint[] = [];
  
  displayedColumns: string[] = ['description', 'type', 'dateComplaint', 'name', 'lastname', 'email', 'status', 'rating', 'idComp'];

  constructor(
    private complaintService: ComplaintService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchComplaints();
  }

  fetchComplaints(): void {
    this.complaintService.getAllComplaints().subscribe(complaints => {
      this.complaints = complaints;
      this.dataSource = new MatTableDataSource(complaints);
    }, error => {
      console.error('Error fetching complaints:', error);
    });
  }
  deleteComplaint(id: number): void {
    this.complaintService.deleteComplaint(id).subscribe({
      next: (response) => {
        // Gérer la réponse de suppression si nécessaire
        console.log('Complaint deleted', response);
        // Rafraîchir la liste des plaintes après suppression
      },
      error: (err) => {
        console.error('Error deleting complaint', err);
      }
    });
  }

  openUpdateDialog(complaint: Complaint): void {
    const dialogRef = this.dialog.open(ComplaintDialogComponent, {
      width: '500px',
      data: { complaint }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchComplaints(); // Refresh the complaints list
        alert('La plainte a été mise à jour avec succès');
      }
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}