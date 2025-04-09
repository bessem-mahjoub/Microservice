import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Définir l'interface pour la réponse du serveur
interface ClusteringResponse {
  labels: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  private baseUrl = 'http://127.0.0.1:5000/'; // URL de votre serveur Flask

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les labels du clustering KMeans
  getKMeansLabels(): Observable<ClusteringResponse> {
    return this.http.get<ClusteringResponse>(`${this.baseUrl}/kmeans`);
  }

  // Méthode pour récupérer les labels du clustering CAH
  getCAHLabels(): Observable<ClusteringResponse> {
    return this.http.get<ClusteringResponse>(`${this.baseUrl}/cah`);
  }

  // Méthode pour récupérer les labels du clustering DBSCAN
  getDBSCANLabels(): Observable<ClusteringResponse> {
    return this.http.get<ClusteringResponse>(`${this.baseUrl}/dbscan`);
  }

  // Méthode pour récupérer les labels du clustering GMM
  getGMMLabels(): Observable<ClusteringResponse> {
    return this.http.get<ClusteringResponse>(`${this.baseUrl}/gmm`);
  }
}
