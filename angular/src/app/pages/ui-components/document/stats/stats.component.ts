import { Component, OnInit } from '@angular/core';
import { TextAnalysisService } from 'src/app/services/TextAnalysisService';
import { saveAs } from 'file-saver';
import { Chart, ChartOptions, ChartData, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  uploadedParagraphs: string[] = [];
  tokenizedWords: string[] = [];
  clusters: string[][] = [];
  selectedFile: File;
  pieChart: Chart<"pie", number[], string> | null = null;

  constructor(private textAnalysisService: TextAnalysisService) {}

  ngOnInit() {
    // Appeler cette méthode une fois que tokenizedWords est prêt
    this.createPieChart();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  extractParagraphs() {
    if (this.selectedFile) {
      this.textAnalysisService.extractParagraphs(this.selectedFile).subscribe(
        paragraphs => {
          this.uploadedParagraphs = paragraphs;
        },
        error => {
          console.error('Error extracting paragraphs:', error);
        }
      );
    }
  }

  tokenizeParagraphs() {
    this.textAnalysisService.tokenize(this.uploadedParagraphs).subscribe(
      tokens => {
        this.tokenizedWords = tokens;
        this.createPieChart(); // Mettre à jour le graphique après la tokenization
      },
      error => {
        console.error('Error tokenizing paragraphs:', error);
      }
    );
  }

  performClustering(numClusters: number) {
    this.textAnalysisService.performKMeansClustering(this.tokenizedWords, numClusters).subscribe(
      clusters => {
        this.clusters = clusters;
      },
      error => {
        console.error('Error performing clustering:', error);
      }
    );
  }

  downloadElbowPlot() {
    this.textAnalysisService.generateElbowPlot(this.tokenizedWords).subscribe(
      blob => {
        saveAs(blob, 'elbow_plot.png');
      },
      error => {
        console.error('Error generating elbow plot:', error);
      }
    );
  }

  createPieChart() {
    const wordCounts = this.calculateWordCounts();

    const canvas = document.getElementById('wordCountChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context is not available');
      return;
    }

    if (this.pieChart) {
      this.pieChart.destroy(); // Détruire l'instance précédente du chart s'il existe
    }

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(wordCounts),
        datasets: [{
          label: 'Word Count',
          data: Object.values(wordCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            // Ajouter plus de couleurs au besoin
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  calculateWordCounts(): { [word: string]: number } {
    const wordCounts: { [word: string]: number } = {};

    this.tokenizedWords.forEach(word => {
      if (wordCounts[word]) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    });

    return wordCounts;
  }
}
