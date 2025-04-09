import { Component, Inject, OnInit } from '@angular/core';
import { Complaint } from 'src/app/core/Complaint';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-complaint-dialog',
  templateUrl: './complaint-dialog.component.html',
  styleUrls: ['./complaint-dialog.component.scss']
})
export class ComplaintDialogComponent implements OnInit {
  complaintForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ComplaintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { complaint: Complaint },
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm(this.data.complaint);
  }

  initForm(comp: Complaint): void {
    this.complaintForm = this.fb.group({
      idComp: [comp.idComp],
      status: [comp.status, Validators.required], // Seule mise à jour du statut
    });
  }

  saveComplaint(): void {
    if (this.complaintForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const idComp = this.complaintForm.value.idComp;
      const url = `http://localhost:8224/api/complaint/${idComp}`;

      // Préparer les données à envoyer pour mettre à jour uniquement le statut
      const updateData = {
        status: this.complaintForm.value.status // Seulement le statut
      };

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      this.http.put(url, updateData, { headers }).subscribe({
        next: (response) => {
          console.log('Mise à jour réussie:', response);
          this.dialogRef.close(response); // Ferme la boîte de dialogue avec la réponse
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          let errorMessage = 'Une erreur est survenue lors de la mise à jour.';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          alert(errorMessage);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else if (!this.complaintForm.valid) {
      alert('Veuillez remplir correctement tous les champs requis.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}