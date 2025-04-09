import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importer HttpClient
import { DataMiningService } from './data-mining.service';
import { Chart, ChartOptions } from 'chart.js';
import { LinearScale, LineController, PointElement, LineElement, Title } from 'chart.js';
Chart.register(LinearScale, LineController, PointElement, LineElement, Title);

interface Point {
  x: number;
  y: number;
}

interface Prediction {
  [key: string]: any;
}

const supportVectors: Point[] = []; // Définissez le type des vecteurs de support
const margin: { start: Point; end: Point; }[] = []; // Définissez le type de la marge

@Component({
  selector: 'app-datamining',
  templateUrl: './datamining.component.html',
  styleUrls: ['./datamining.component.scss']
})
export class DataminingComponent implements OnInit {
  predictions: Prediction = {}; // Define the type as Prediction
  bestFeatures: string[] = [];
  scatterChart: any;
  svmChart: any;
  colors: string[] = ['rgba(75, 192, 192, 0.2)', 'rgba(192, 75, 192, 0.2)', 'rgba(192, 192, 75, 0.2)', 'rgba(192, 75, 75, 0.2)', 'rgba(75, 192, 75, 0.2)'];
  modelNames: string[] = ['Logistic Regression', 'KNN', 'SVM', 'Random Forest'];
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  

  constructor(private dataMiningService: DataMiningService, private cdr: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllPredictions();
  }

  getAllPredictions() {
    this.dataMiningService.getAllPredictions().subscribe(
      data => {
        console.log('Data received:', data);
        this.predictions = data;
        this.createScatterChart();
      },
      error => {
        console.error('Error fetching predictions:', error);
      }
    );
  }

  createScatterChart() {
    const labels = Object.keys(this.predictions);
    const datasets = Object.values(this.predictions) as { [key: number]: number }[];

    const formattedDatasets = datasets.map((prediction, index) => {
      const data = Object.values(prediction);
      return {
        data: data,
        backgroundColor: this.colors[index % this.colors.length],
      };
    });

    console.log('Labels:', labels);
    console.log('Datasets:', formattedDatasets);

    const chartOptions: ChartOptions = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Predicted Etat'
          }
        },
        y: {
          title: {
            display: true,
            text: 'True Etat'
          },
          beginAtZero: true
        }
      }
    };

    this.scatterChart = new Chart('scatterCanvas', {
      type: 'scatter',
      data: {
        labels: labels,
        datasets: formattedDatasets.map((formattedDataset, index) => ({
          label: labels[index],
          data: formattedDataset.data.map((value, i) => ({ x: i, y: value })),
          backgroundColor: formattedDataset.backgroundColor,
          pointStyle: 'circle',
          pointRadius: 5,
          borderWidth: 0
        }))
      },
      options: chartOptions
    });
  }

  generateLegends(): { name: string, color: string }[] {
    return this.modelNames.map((name, index) => ({ name: name, color: this.colors[index] }));
  }

  getBestFeatures() {
    this.dataMiningService.getBestFeatures().subscribe(
      (response: any) => {
        console.log('Best Features:', response);
        this.bestFeatures = response['Best Features']; // Assurez-vous que c'est la clé correcte
      },
      error => {
        console.error('Error fetching best features:', error);
      }
    );
  }
  submitForm(form: any) {
    const formData = {
      nom: form.value.nom,
      prenom: form.value.prenom,
      code_section: Number(form.value.code_section),
      date_etat: Number(form.value.date_etat)
    };
  
    if (isNaN(formData.code_section) || isNaN(formData.date_etat)) {
      alert('Code Section et Date Etat doivent être des nombres.');
      return;
    }
  
    this.http.post<any>('http://127.0.0.1:5000/predict', formData).subscribe(
      data => {
        if (data.error) {
          console.error('Error:', data.error);
          alert('Erreur: ' + data.error);
        } else {
          console.log('Prediction result:', data);
          alert('Prediction: ' + data['Prediction']);
        }
      },
      error => {
        console.error('Error:', error);
        alert('Erreur: ' + error.message);
      }
    );
  }
  
}
