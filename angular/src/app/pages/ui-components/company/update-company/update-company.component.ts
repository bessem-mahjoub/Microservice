import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/core/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent {
  constructor(
  public dialogRef: MatDialogRef<UpdateCompanyComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Company,
  private companyService : CompanyService
) {}

updateCompany(company: Company): void {
  this.companyService.updateCompany(this.data.id, company).subscribe(
    (response) => {
      console.log('Company updated successfully:', response);
      this.dialogRef.close(true);
    },
    (error) => {
      console.error('Error updating company:', error);
    }
  );
}

onClose(): void {
  this.dialogRef.close(false); 
}
}