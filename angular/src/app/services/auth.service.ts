import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role, User } from '../core/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  login(email: string, password: string): boolean {
    // Simulating authentication logic
    if (email === 'student@esprit.tn' && password === 'aaa') {
      localStorage.setItem('currentUser', JSON.stringify({ id: 1, email: email, role: Role.STUDENT }));
      this.router.navigate(['/dashboard/student']);
      return true;
    }
       console.log('Attempting login with email:', email);
      if (email === 'supervisor@supervisor.com' && password === 'aaa') {
      localStorage.setItem('currentUser', JSON.stringify({ id: 2, email: email, role: Role.SUPERVISOR }));
      console.log('Logged in as supervisor');
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      console.log('Login failed');
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['http://localhost:3001/Login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }
}
