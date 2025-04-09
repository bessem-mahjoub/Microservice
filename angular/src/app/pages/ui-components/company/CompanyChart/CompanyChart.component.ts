import { Component, OnInit } from '@angular/core';
import Chart, { ChartItem } from 'chart.js/auto';
import { Company } from 'src/app/core/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-chart',
  templateUrl: './companychart.component.html',
  styleUrls: ['./companychart.component.css']
})
export class CompanyChartComponent implements OnInit {

  totalCompanies: number;
  companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.getAllCompanies().subscribe(companies => {
      // Count the total number of companies
      this.totalCompanies = companies.length;
      console.log('Total companies:', this.totalCompanies);
      // Render chart using Chart.js
      this.showChart();
    });
  }

  showChart(): void {
    console.log('Rendering chart with total companies:', this.totalCompanies);

    const canvas = document.getElementById('companyChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D rendering context for canvas');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Companies'],
        datasets: [{
          label: 'Total Companies',
          data: [this.totalCompanies],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            type: 'linear', // Specify the correct scale type for the y-axis
            beginAtZero: true
          }
        }
      }
    });
}

}
