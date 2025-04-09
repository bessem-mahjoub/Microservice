
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../core/Complaint';
import { constantes } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private baseUrl = constantes.base_url+'api/complaint';

  constructor(private http: HttpClient) { }

  createComplaint(complaint: Complaint): Observable<Complaint> {       
    return this.http.post<Complaint>(`${this.baseUrl}/add` ,complaint);
  }
  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/All`);
  }
  deleteComplaint(idComp: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idComp}`);
  }
  updateComplaint(idComp: number, status: string): Observable<any> {
    const url = `${this.baseUrl}/${idComp}`; // S'assurer que l'URL est correcte
    const body = { status }; // Corps de la requête avec le champ 'status' uniquement
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // Définir le type de contenu
  
    return this.http.put<any>(url, body, { headers }); // Utilisation de <any> pour le type de réponse (ou spécifier un type spécifique)
  }
  getComplaintById(idComp: number): Observable<Complaint> {
    const url = `${this.baseUrl}/${idComp}`;
    return this.http.get<Complaint>(url);
  }
  getComplaintByUserId(idUser: number): Observable<Complaint[]> {
    const url = `${this.baseUrl}/getAllByUserId/${idUser}`;
    return this.http.get<Complaint[]>(url);

  }

  



}
