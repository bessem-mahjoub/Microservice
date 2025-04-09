import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private keycloak: KeycloakService) {
    this.initUserInfo();
  }

  private async initUserInfo() {
    if (await this.keycloak.isLoggedIn()) {
      const userProfile = await this.keycloak.loadUserProfile();
      const roles = this.keycloak.getUserRoles();
      
      this.userSubject.next({
        ...userProfile,
        roles: roles
      });
    }
  }

  getUserInfo(): Observable<any> {
    return this.userSubject.asObservable();
  }

  async logout() {
    await this.keycloak.logout();
  }

  async login() {
    await this.keycloak.login();
  }

  isUserInRole(role: string): boolean {
    return this.keycloak.getUserRoles().includes(role);
  }
}