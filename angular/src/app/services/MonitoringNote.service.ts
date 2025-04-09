import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitoringNote } from '../core/MonitoringNote';
import { Status } from '../core/Status.enum';

@Injectable({
  providedIn: 'root'
})
export class MonitoringNoteService {

  private baseUrl = 'http://localhost:8224/api/monitoring';

  constructor(private http: HttpClient) { }

  getAllMonitoringNotes(): Observable<MonitoringNote[]> {
    return this.http.get<MonitoringNote[]>(this.baseUrl);
  }

  getMonitoringNoteById(id: number): Observable<MonitoringNote> {
    return this.http.get<MonitoringNote>(`${this.baseUrl}/${id}`);
  }

  createMonitoringNote(monitoringNote: MonitoringNote): Observable<MonitoringNote> {
    return this.http.post<MonitoringNote>(this.baseUrl, monitoringNote);
  }

  updateMonitoringNote(id: number, monitoringNote: MonitoringNote): Observable<MonitoringNote> {
    return this.http.put<MonitoringNote>(`${this.baseUrl}/${id}`, monitoringNote);
  }

  deleteMonitoringNoteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getMonitoringNotesByStatus(status: Status): Observable<MonitoringNote[]> {
    return this.http.get<MonitoringNote[]>(`${this.baseUrl}/notes?status=${status}`);
  }
}
