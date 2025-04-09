import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextAnalysisService {

  private baseUrl = 'http://localhost:8224/api/text-analysis';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<string[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<string[]>(`${this.baseUrl}/upload-file`, formData);
  }

  extractParagraphs(file: File): Observable<string[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<string[]>(`${this.baseUrl}/extract-paragraphs`, formData);
  }

  tokenize(paragraphs: string[]): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/tokenize`, paragraphs);
  }

  generateElbowPlot(tokens: string[]): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/elbow-plot`, tokens, {
      responseType: 'blob'
    });
  }

  performKMeansClustering(tokens: string[], numClusters: number): Observable<string[][]> {
    return this.http.post<string[][]>(`${this.baseUrl}/kmeans-clustering/${numClusters}`, tokens);
  }
}
