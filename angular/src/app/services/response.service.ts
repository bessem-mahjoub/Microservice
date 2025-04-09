import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from '../core/Response';
import { constantes } from '../constants';
import { SatisfactionLevel } from '../core/SatisfactionLevel';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private baseUrl = `${constantes.base_url}api/response`;

  constructor(private http: HttpClient) {}

  createResponse(response: Response): Observable<Response> {
    return this.http.post<Response>(this.baseUrl, response);
  }

  giveNote(id: number, note: string): Observable<any> {
    if (id && note) {
        const url = `${this.baseUrl}/note/${id}`;
        return this.http.put(url, note);
    } else {
        console.error('ID or note is undefined');
        return Observable.create();
    }
}

  getResponseByUserId(idUser: number): Observable<Response[]> {
    const url = `${this.baseUrl}/getResponseByUserId/${idUser}`;
    return this.http.get<Response[]>(url);
  }
}
