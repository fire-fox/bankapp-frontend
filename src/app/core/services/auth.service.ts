import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak = inject(KeycloakService);

  isLoggedIn(): Observable<boolean> {
    // isLoggedIn() in keycloak-angular v20 returns boolean synchronously
    return of(this.keycloak.isLoggedIn());
  }

  login(): Observable<void> {
    return from(this.keycloak.login());
  }

  logout(): Observable<void> {
    return from(this.keycloak.logout(window.location.origin));
  }

  getUserProfile(): Observable<KeycloakProfile> {
    return from(this.keycloak.loadUserProfile());
  }

  getUsername(): string {
    return this.keycloak.getUsername();
  }

  getUserRoles(): string[] {
    return this.keycloak.getUserRoles();
  }

  hasRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }

  getToken(): Promise<string> {
    return this.keycloak.getToken();
  }
}
