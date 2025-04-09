import { InternshipComponent } from './../../internship/internship.component';
import { TypeInternship } from './../../../../core/TypeInternship';
import { CompanyService } from 'src/app/services/company.service';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent {
  typeInternship :TypeInternship;
  company_id: number;
  offerForm: FormGroup;
  internshipOptions = [
    "HUMAN_DEVELOPMENT",
    "INFORMATION_TECHNOLOGY",
    "OPTIONAL",
    "ENGINEERING"
  ]
    
  constructor(
    private router: Router,
    private OfferService: OfferService,
    public dialogRef: MatDialogRef<AddOfferComponent>,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.offerForm = this.formBuilder.group({
      "typeInternship": new FormControl("", [ Validators.required ])
    });
    this.company_id=data.companyId;
  }

  addOffer(): void {
    console.log("adding");
    const it=this.offerForm.value.typeInternship
      const formData = new FormData();
      formData.append('offer', JSON.stringify({
        "typeInternship": it
      }));
      this.OfferService.addOffer({"typeInternship": it}, this.company_id).subscribe(
        (response) => {
          console.log('Offer added successfully:', response);
          this.router.navigate(['/ui-components/company']);
          this.dialogRef.close();
          this.snackbar.open('Offer added successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        (error) => {
          console.error('Error adding offer:', error);
          this.snackbar.open('Failed to add offer', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
;
  }
}
