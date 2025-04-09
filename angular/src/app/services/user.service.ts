
import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../core/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) { }

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`) ; 
  }
    /*  .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
          throw error;
        })
      );
  }
  */

  getUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/byRole/${role}`);
  }
   /*getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map(users => {
        // Transformer les utilisateurs en incluant le nom complet
        users.forEach(user => {
          user.fullName = `${user.name} ${user.lastName}`;
        });
        return users;
      })
    );
   }*/
  /*getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8081/api/');
  }*/
 /* getUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }*/
  /*getUseduserIds(): Observable<number[]> {
    // Appel HTTP pour récupérer les IDs des défenses déjà utilisées depuis un service externe
    return this.http.get<number[]>(`${this.baseUrl}`);
  }*/
}
