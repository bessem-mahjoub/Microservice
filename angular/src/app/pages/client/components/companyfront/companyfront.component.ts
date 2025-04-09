import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/core/Company';

@Component({
  selector: 'app-companyfront',
  templateUrl: './companyfront.component.html',
  styleUrls: ['./companyfront.component.scss']
})
export class CompanyfrontComponent implements OnInit {

  companies: Company[];
  constructor(private CompanyService: CompanyService, private router: Router,
  ) { }
  fetchCompanies(): void {
    this.CompanyService.getAllCompanies().subscribe(
        companies => {
        this.companies = companies;
      },
      error => {
        console.error('Error fetching companies:', error);
      }
    );
  }
  ngOnInit(): void {
    this.fetchCompanies();
  }
  getImageUrl(attachmentData: any): string {
    if (attachmentData) {
      const base64String = btoa(String.fromCharCode.apply(null, attachmentData));
      console.log('Base64 String:', base64String);
      return `data:image/png;base64,${attachmentData.data}`;
    } else {
      console.error('No attachment data found.');
      return '';
    }
  }

  show_offers(company_id: number): void {
    this.router.navigate(["/components/offerfront", company_id]);
  }
}
