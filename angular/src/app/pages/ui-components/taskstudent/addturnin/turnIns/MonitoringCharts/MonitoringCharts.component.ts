import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonitoringNote } from 'src/app/core/MonitoringNote';
import { Status } from 'src/app/core/Status.enum';
import { MonitoringNoteService } from 'src/app/services/MonitoringNote.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-MonitoringCharts',
  templateUrl: './MonitoringCharts.component.html',
  styleUrls: ['./MonitoringCharts.component.css']
})
export class MonitoringChartsComponent implements OnInit {
  @ViewChild('monitoringChart') chartRef: ElementRef;
  monitoringChart: any;

  failedNotes: MonitoringNote[];
  doneNotes: MonitoringNote[];

  constructor(private monitoringNoteService: MonitoringNoteService) { }

  ngOnInit(): void {
    this.fetchMonitoringNotesByStatus(Status.FAILED);
    this.fetchMonitoringNotesByStatus(Status.DONE);
  }

  fetchMonitoringNotesByStatus(status: Status): void {
    this.monitoringNoteService.getMonitoringNotesByStatus(status).subscribe(
      (notes: MonitoringNote[]) => {
        if (status === Status.FAILED) {
          this.failedNotes = notes;
        } else if (status === Status.DONE) {
          this.doneNotes = notes;
        }
        this.renderChart();
      },
      (error: any) => {
        console.error(`Error fetching ${status} monitoring notes:`, error);
        // Handle error
      }
    );
  }
  renderChart(): void {
    if (!this.failedNotes || !this.doneNotes) {
      return;
    }

    const totalCount = this.failedNotes.length + this.doneNotes.length;

    const failedPercentage = (this.failedNotes.length / totalCount) * 100;
    const donePercentage = (this.doneNotes.length / totalCount) * 100;

    const chartData = {
      labels: ['Failed', 'Done'],
      datasets: [
        {
          label: 'Monitoring Notes',
          data: [failedPercentage, donePercentage],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    if (this.monitoringChart) {
      this.monitoringChart.destroy();
    }

    this.monitoringChart = new Chart(this.chartRef.nativeElement, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return label + ': ' + value.toFixed(2) + '%';
              }
            }
          }
        }
      }
    });
  }

}
