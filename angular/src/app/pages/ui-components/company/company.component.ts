
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/core/Company';
import { CompanyService } from 'src/app/services/company.service';
import { AddCompanyComponent } from './add-company/add-company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import Chart, { ChartItem } from 'chart.js/auto';
import { CompanyChartComponent } from './CompanyChart/CompanyChart.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies: Company[];
  searchTerm: string = '';
  filteredCompanies: Company[];
  @ViewChild('barChartCanvas') barChartCanvas: ElementRef;
  @ViewChild('pieChartCanvas') pieChartCanvas: ElementRef;
  totalCompanies: number;
  constructor(private companyService: CompanyService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchCompanies();
  }
  showChart(): void {
    this.dialog.open(CompanyChartComponent, {
      width: '400px', // Adjust width as needed
      height: '400px', // Adjust height as needed
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCompanyComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchCompanies();
    });
  }

  Offer(company_id: number): void {
    this.router.navigate(["/ui-components/offer", company_id]);
  }

  openUpdateDialog(id: number): void {
    const dialogRef = this.dialog.open(UpdateCompanyComponent, {
      data: { id: id, ...this.companies.find(Company => Company.id === id) }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchCompanies();
    });
  }

  fetchCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      companies => {
        this.companies = companies;
        this.filteredCompanies = companies; // Initialise filteredCompanies avec toutes les entreprises
      },
      error => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(id).subscribe(
        () => {
          this.companies = this.companies.filter(company => company.id !== id);
          this.filteredCompanies = this.companies; // Mettre à jour filteredCompanies après la suppression
        },
        error => {
          console.error('Error deleting company:', error);
        }
      );
    }
  }

  filterCompanies(): void {
    console.log('Search term:', this.searchTerm);
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCompanies = this.companies.filter(company => {
      return (
        company.name?.toLowerCase().includes(searchTermLower) ||
        company.address?.toLowerCase().includes(searchTermLower) ||
        company.email?.toLowerCase().includes(searchTermLower) ||
        company.description?.toLowerCase().includes(searchTermLower) ||
        company.pnumber?.toString().includes(searchTermLower)
      );
    });
  }
}
