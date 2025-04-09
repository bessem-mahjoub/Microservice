import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataMiningService {

  constructor(private http: HttpClient) { }

  getAllPredictions(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/predictions');
  }

  getKnnPredictions(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/predictions/knn');
  }

  getRandomForestPredictions(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/predictions/randomforest');
  }

  getLogisticRegressionPredictions(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:5000/predictions/logisticregression');
  }
  getBestFeatures(): Observable<string[]> {
    return this.http.get<string[]>('http://127.0.0.1:5000/best_features');
  }
}
