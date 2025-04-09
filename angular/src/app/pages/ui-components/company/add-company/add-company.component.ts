import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent {
  id: number;
  name: string = '';
  address: string = '';
  email: string = '';
  description: string = '';
  pnumber: number = 0;

  companyForm: FormGroup;

  constructor(
    private router: Router,
    private companyservice: CompanyService,
    public dialogRef: MatDialogRef<AddCompanyComponent>,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      pnumber: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCompany(): void {
    if (this.companyForm.valid) {
      const formData = {
        id: this.id,
        name: this.companyForm.value.name,
        address: this.companyForm.value.address,
        email: this.companyForm.value.email,
        description: this.companyForm.value.description,
        pnumber: this.companyForm.value.pnumber,
        offers: []
      };

      this.companyservice.addCompany(formData).subscribe(
        (response) => {
          console.log('Company added successfully:', response);
          this.router.navigate(['/ui-components/company']);
          this.dialogRef.close();
          this.snackbar.open('Company added successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        (error) => {
          console.error('Error adding company:', error);
          this.snackbar.open('Failed to add company', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }
}
