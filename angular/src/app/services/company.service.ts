import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../core/Company';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:8224/api/company';

  constructor(private http: HttpClient) { }

  addCompany(companyData: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/add`, companyData);
  }
  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl);
  }
  deleteCompany(idComp: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idComp}`);
  }
  updateCompany(idComp: number, updatedCompany: Company): Observable<Company> {
    const url = `${this.baseUrl}/${idComp}`;
    return this.http.put<Company>(url, updatedCompany);
  }
  getCompanybyId(idComp: number): Observable<Company> {
    const url = `${this.baseUrl}/${idComp}`;
    return this.http.get<Company>(url);
  }
}
