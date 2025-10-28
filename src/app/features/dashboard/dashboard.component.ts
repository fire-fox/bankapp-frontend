import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Balance</h3>
          <p class="stat-value">$12,345.67</p>
        </div>

        <div class="stat-card">
          <h3>Active Accounts</h3>
          <p class="stat-value">3</p>
        </div>

        <div class="stat-card">
          <h3>Recent Transactions</h3>
          <p class="stat-value">15</p>
        </div>
      </div>

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <div class="activity-item">
            <span>Transfer to Account ***4567</span>
            <span class="amount">-$250.00</span>
          </div>
          <div class="activity-item">
            <span>Deposit</span>
            <span class="amount success">+$1,000.00</span>
          </div>
          <div class="activity-item">
            <span>Payment - Utilities</span>
            <span class="amount">-$150.00</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem 0;
    }

    h2 {
      margin-bottom: 2rem;
      color: var(--dark-color);
    }

    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: var(--white);
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-card h3 {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 600;
      color: var(--primary-color);
      margin: 0;
    }

    .recent-activity {
      background: var(--white);
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .recent-activity h3 {
      margin-bottom: 1rem;
      color: var(--dark-color);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      border-bottom: 1px solid var(--gray-200);

      &:last-child {
        border-bottom: none;
      }
    }

    .amount {
      font-weight: 600;
      color: var(--danger-color);

      &.success {
        color: var(--success-color);
      }
    }
  `]
})
export class DashboardComponent {}
