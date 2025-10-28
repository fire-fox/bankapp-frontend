import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
              <a routerLink="/" class="nav-link">Dashboard</a>
              <a routerLink="/accounts" class="nav-link">Accounts</a>
              <a routerLink="/transactions" class="nav-link">Transactions</a>
              <a routerLink="/profile" class="nav-link">Profile</a>
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
      background-color: var(--primary-color);
      color: var(--white);
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .navbar-menu {
      display: flex;
      gap: 1.5rem;
    }

    .nav-link {
      color: var(--white);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        text-decoration: none;
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
  `]
})
export class AppComponent {
  title = 'BankApp - Secure Online Banking';
}
