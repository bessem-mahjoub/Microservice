import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternshipInter } from './InternshipInter'; // Importez la bonne interface

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  private apiUrl = 'http://localhost:8224/api/internships'; // Assurez-vous de changer l'URL selon votre configuration

  constructor(private http: HttpClient) { }

  getAllInternships(): Observable<InternshipInter[]> {
    return this.http.get<InternshipInter[]>(this.apiUrl); // Utilisez la bonne interface
  }

  getInternshipById(id: number): Observable<InternshipInter> {
    return this.http.get<InternshipInter>(`${this.apiUrl}/${id}`); // Utilisez la bonne interface
  }

  createInternship(internship: InternshipInter): Observable<InternshipInter> {
    return this.http.post<InternshipInter>(this.apiUrl, internship); // Utilisez la bonne interface
  }
  updateInternship(internshipId: number, updatedInternship: any): Observable<any> {
    const url = `${this.apiUrl}/${internshipId}`;
    return this.http.put(url, updatedInternship);
  }
  deleteInternship(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
