import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { defense } from '../core/Defense';
import { HistoriqueDefense } from '../core/HistoriqueDefense';

@Injectable({
  providedIn: 'root'
})
export class DefenceService {
  // Base URLs configuration
  private readonly GATEWAY_URL = 'http://localhost:8224/api/defences';

  constructor(private http: HttpClient) {}

  // Core Defense Operations
  getAllDefenses(): Observable<defense[]> {
    return this.http.get<defense[]>(`${this.GATEWAY_URL}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getDefenseById(defenseId: number): Observable<defense> {
    return this.http.get<defense>(`${this.GATEWAY_URL}/${defenseId}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createDefense(defense: Omit<defense, 'idDef'>): Observable<defense> {
    return this.http.post<defense>(`${this.GATEWAY_URL}`, defense)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDefense(defense: defense): Observable<defense> {
    return this.http.put<defense>(`${this.GATEWAY_URL}/defences/${defense.idDef}`, defense)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteDefense(defenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.GATEWAY_URL}/${defenseId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Additional Defense Operations
  getUsedDates(): Observable<Date[]> {
    return this.http.get<Date[]>(`${this.GATEWAY_URL}/used-dates`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Historical Defense Operations
  getAllHistoriqueDefense(): Observable<HistoriqueDefense[]> {
    return this.http.get<HistoriqueDefense[]>(`${this.GATEWAY_URL}/getAllHistoriqueDefense`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchHistoriques(query: string): Observable<HistoriqueDefense[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<HistoriqueDefense[]>(`${this.GATEWAY_URL}/search`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
