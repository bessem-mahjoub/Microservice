import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../core/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'http://localhost:8224/api/request';
  constructor(private http: HttpClient) {}

  getAllrequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.baseUrl);
  }
  createrequest(formData: FormData): Observable<Request> {
    return this.http.post<Request>(this.baseUrl, formData);
  }
}
