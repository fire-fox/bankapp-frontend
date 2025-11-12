import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header class="header">
        <div class="container">
          <nav class="navbar">
            <div class="navbar-brand">
              <h1>🏦 BankApp</h1>
            </div>
            <div class="navbar-menu">
              @if (isLoggedIn) {
                <a routerLink="/" class="nav-link">Dashboard</a>
                <a routerLink="/accounts" class="nav-link">Accounts</a>
                <a routerLink="/transactions" class="nav-link">Transactions</a>
                <a routerLink="/profile" class="nav-link">Profile</a>
              }
            </div>
            <div class="navbar-actions">
              @if (isLoggedIn) {
                <span class="user-info">👤 {{ username }}</span>
                <button (click)="logout()" class="btn-logout">Logout</button>
              } @else {
                <button (click)="login()" class="btn-login">Login</button>
              }
            </div>
          </nav>
        </div>
      </header>

      <main class="main-content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>

      <footer class="footer">
        <div class="container text-center">
          <p>&copy; 2025 BankApp. All rights reserved. | Secure Banking Platform</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: var(--white);
      padding: 0;
      box-shadow: var(--shadow-lg);
      position: sticky;
      top: 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      gap: 2rem;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
      background: linear-gradient(to right, #fff, #e0f2fe);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .navbar-menu {
      display: flex;
      gap: 0.5rem;
      flex: 1;
      justify-content: center;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 0.625rem 1.25rem;
      border-radius: 0.5rem;
      transition: all 0.2s;
      font-weight: 500;
      position: relative;

      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
        color: var(--white);
        text-decoration: none;
        transform: translateY(-1px);
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--white);
        transition: all 0.3s;
        transform: translateX(-50%);
      }

      &:hover::after {
        width: 80%;
      }
    }

    .main-content {
      flex: 1;
      padding: 2rem 0;
    }

    .footer {
      background-color: var(--dark-color);
      color: var(--white);
      padding: 1.5rem 0;
      margin-top: auto;
    }

    .footer p {
      margin: 0;
      font-size: 0.875rem;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      color: var(--white);
      font-size: 0.875rem;
    }

    .btn-login, .btn-logout {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-login {
      background-color: var(--white);
      color: var(--primary-color);
    }

    .btn-login:hover {
      background-color: rgba(255, 255, 255, 0.9);
    }

    .btn-logout {
      background-color: rgba(255, 255, 255, 0.2);
      color: var(--white);
    }

    .btn-logout:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  `]
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  title = 'BankApp - Secure Online Banking';
  isLoggedIn = false;
  username = '';

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.username = this.authService.getUsername();
      }
    });
  }

  login(): void {
    this.authService.login().subscribe();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
