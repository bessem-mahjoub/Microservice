import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnIn } from '../core/TurnIn';


@Injectable({
  providedIn: 'root'
})
export class TurnInService {
  private baseUrl = 'http://localhost:8224/api/turnins';

  constructor(private http: HttpClient) { }

  submitTurnIn(formData: FormData): Observable<TurnIn> {
    return this.http.post<TurnIn>(this.baseUrl, formData);
  }

  getAllTurnIns(): Observable<TurnIn[]> {
    return this.http.get<TurnIn[]>(this.baseUrl);
  }

  getTurnInById(turnInId: number): Observable<TurnIn> {
    return this.http.get<TurnIn>(`${this.baseUrl}/${turnInId}`);
  }

  getTurnInsByStudentId(studentId: number): Observable<TurnIn[]> {
    return this.http.get<TurnIn[]>(`${this.baseUrl}/student/${studentId}`);
  }
}
