
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Offer } from 'src/app/core/Offer';
import { OfferService } from 'src/app/services/offer.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeInternship } from 'src/app/core/TypeInternship';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.scss']
})
export class UpdateOfferComponent {
  typeInternship :TypeInternship;
  offerForm: FormGroup;
  internshipOptions = [
    "HUMAN_DEVELOPMENT",
    "INFORMATION_TECHNOLOGY",
    "OPTIONAL",
    "ENGINEERING"
  ]
    
  constructor(
    private router: Router,
    private offerService: OfferService,
    public dialogRef: MatDialogRef<UpdateOfferComponent>,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Offer
  ) {
    this.offerForm = this.formBuilder.group({
      "typeInternship": new FormControl("", [ Validators.required ])
    });
  }
updateOffer(offer: Offer): void {
  this.offerService.updateOffer(this.data.id, offer).subscribe(
    (response) => {
      console.log('Offer updated successfully:', response);
      this.dialogRef.close(true);
    },
    (error) => {
      console.error('Error updating offer:', error);
    }
  );
}

onClose(): void {
  this.dialogRef.close(false); 
}
}



