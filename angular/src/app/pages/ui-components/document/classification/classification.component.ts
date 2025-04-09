import { Component, OnInit } from '@angular/core';
import { ClassificationService } from './classification.service';


@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  kmeansLabels: number[] = [];
  cahLabels: number[] = [];
  dbscanLabels: number[] = [];
  gmmLabels: number[] = [];

  constructor(private classificationService: ClassificationService) { }

  ngOnInit(): void {
    // Appel des méthodes du service pour récupérer les labels de clustering
    this.classificationService.getKMeansLabels().subscribe(response => {
      this.kmeansLabels = response.labels; // Utilisation de la notation de point pour accéder à la propriété 'labels'
    });

    this.classificationService.getCAHLabels().subscribe(response => {
      this.cahLabels = response.labels;
    });

    this.classificationService.getDBSCANLabels().subscribe(response => {
      this.dbscanLabels = response.labels;
    });

    this.classificationService.getGMMLabels().subscribe(response => {
      this.gmmLabels = response.labels;
    });
  }
}
