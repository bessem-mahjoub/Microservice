import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role , User } from 'src/app/core/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private router: Router) {}
  login(email: string, password: string): boolean {
    // Simulating authentication logic
    if (email === 'yassine.kalboussi@esprit.tn' && password === 'azerty') {
      localStorage.setItem('currentUser', JSON.stringify({ id: 1, email: email, role: Role.STUDENT }));
      this.router.navigate(['/dashboard']);
      return true;
    }
       console.log('Attempting login with email:', email);
      if (email === 'mohamedhadji603@gmail.com' && password === 'azerty') {
      localStorage.setItem('currentUser', JSON.stringify({ id: 2, email: email, role: Role.SUPERVISOR }));
      console.log('Logged in as supervisor');
      this.router.navigate(['/dashboard']);
      return true;
    } else if (email === 'admin@esprit.tn' && password === 'azerty') {
      localStorage.setItem('currentUser', JSON.stringify({ id: 3, email: email, role: Role.ADMIN }));
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      console.log('Login failed');
      return false;
    }
  }
  getCurrentUser(): User | null {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }
}
