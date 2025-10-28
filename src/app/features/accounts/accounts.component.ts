import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accounts">
      <div class="header-section">
        <h2>My Accounts</h2>
        <button class="btn btn-primary">+ New Account</button>
      </div>

      <div class="accounts-grid">
        @for (account of accounts; track account.id) {
          <div class="account-card">
            <div class="account-header">
              <h3>{{ account.name }}</h3>
              <span class="account-type">{{ account.type }}</span>
            </div>
            <div class="account-balance">
              <span class="label">Balance</span>
              <span class="value">{{ account.balance | currency }}</span>
            </div>
            <div class="account-number">
              <span class="label">Account Number</span>
              <span class="value">{{ account.number }}</span>
            </div>
            <div class="account-actions">
              <button class="btn btn-sm">View Details</button>
              <button class="btn btn-sm">Transfer</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .accounts {
      padding: 2rem 0;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .accounts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .account-card {
      background: var(--white);
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .account-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .account-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--dark-color);
    }

    .account-type {
      padding: 0.25rem 0.75rem;
      background: var(--primary-color);
      color: var(--white);
      border-radius: 1rem;
      font-size: 0.75rem;
      text-transform: uppercase;
    }

    .account-balance,
    .account-number {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    .label {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin-bottom: 0.25rem;
    }

    .value {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--dark-color);
    }

    .account-balance .value {
      font-size: 1.5rem;
      color: var(--success-color);
    }

    .account-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1.5rem;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  `]
})
export class AccountsComponent {
  accounts = [
    {
      id: '1',
      name: 'Main Checking',
      type: 'Checking',
      balance: 5234.56,
      number: '****1234'
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'Savings',
      balance: 12500.00,
      number: '****5678'
    },
    {
      id: '3',
      name: 'Business Account',
      type: 'Business',
      balance: 45678.90,
      number: '****9012'
    }
  ];
}
