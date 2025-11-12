import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../core/services/account.service';
import { TransactionService } from '../../core/services/transaction.service';

interface DashboardStats {
  totalBalance: number;
  activeAccounts: number;
  recentTransactions: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <div>
          <h1>Welcome back!</h1>
          <p class="subtitle">Here's your financial overview</p>
        </div>
        <div class="date-display">
          <span class="date-icon">📅</span>
          <span>{{ currentDate | date:'EEEE, MMMM d, y' }}</span>
        </div>
      </div>

      @if (loading) {
        <div class="loading-container">
          <div class="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      } @else if (error) {
        <div class="error-message">
          <span class="error-icon">⚠️</span>
          <p>{{ error }}</p>
          <button class="btn btn-primary" (click)="loadDashboardData()">Retry</button>
        </div>
      } @else {
        <div class="stats-grid">
          <div class="stat-card primary">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <h3>Total Balance</h3>
              <p class="stat-value">{{ stats.totalBalance | currency }}</p>
              <span class="stat-change positive">+2.5% from last month</span>
            </div>
          </div>

          <div class="stat-card success">
            <div class="stat-icon">🏦</div>
            <div class="stat-content">
              <h3>Active Accounts</h3>
              <p class="stat-value">{{ stats.activeAccounts }}</p>
              <span class="stat-label">All accounts active</span>
            </div>
          </div>

          <div class="stat-card info">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <h3>Transactions</h3>
              <p class="stat-value">{{ stats.recentTransactions }}</p>
              <span class="stat-label">This month</span>
            </div>
          </div>

          <div class="stat-card warning">
            <div class="stat-icon">💸</div>
            <div class="stat-content">
              <h3>Monthly Expenses</h3>
              <p class="stat-value">{{ stats.monthlyExpenses | currency }}</p>
              <span class="stat-change negative">+12% from last month</span>
            </div>
          </div>
        </div>

        <div class="dashboard-content">
          <div class="recent-activity-section">
            <div class="section-header">
              <h3>Recent Transactions</h3>
              <a href="/transactions" class="view-all-link">View All →</a>
            </div>

            @if (recentTransactions.length === 0) {
              <div class="empty-state">
                <span class="empty-icon">📭</span>
                <p>No recent transactions</p>
              </div>
            } @else {
              <div class="activity-list">
                @for (txn of recentTransactions; track txn.id) {
                  <div class="activity-item">
                    <div class="activity-icon" [class]="'icon-' + txn.type">
                      {{ getTransactionIcon(txn.type) }}
                    </div>
                    <div class="activity-details">
                      <p class="activity-title">{{ txn.description }}</p>
                      <p class="activity-date">{{ txn.created_at | date:'short' }}</p>
                    </div>
                    <div class="activity-amount" [class.negative]="txn.amount < 0">
                      {{ txn.amount | currency }}
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <div class="quick-actions-section">
            <div class="section-header">
              <h3>Quick Actions</h3>
            </div>
            <div class="quick-actions">
              <button class="action-btn transfer">
                <span class="action-icon">💸</span>
                <span class="action-label">Transfer Money</span>
              </button>
              <button class="action-btn payment">
                <span class="action-icon">💳</span>
                <span class="action-label">Pay Bills</span>
              </button>
              <button class="action-btn deposit">
                <span class="action-icon">💵</span>
                <span class="action-label">Deposit</span>
              </button>
              <button class="action-btn account">
                <span class="action-icon">➕</span>
                <span class="action-label">New Account</span>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem 0;
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, var(--primary-color) 0%, #0056b3 100%);
      border-radius: 1rem;
      color: white;
    }

    .dashboard-header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
    }

    .subtitle {
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
      font-size: 1rem;
    }

    .date-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
    }

    .date-icon {
      font-size: 1.2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--white);
      padding: 1.75rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.07);
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
      transition: transform 0.2s, box-shadow 0.2s;
      border-left: 4px solid;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 12px rgba(0,0,0,0.12);
    }

    .stat-card.primary { border-left-color: var(--primary-color); }
    .stat-card.success { border-left-color: var(--success-color); }
    .stat-card.info { border-left-color: var(--info-color); }
    .stat-card.warning { border-left-color: var(--warning-color); }

    .stat-icon {
      font-size: 2.5rem;
      opacity: 0.8;
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--dark-color);
      margin: 0.25rem 0;
    }

    .stat-change, .stat-label {
      font-size: 0.8rem;
      font-weight: 500;
      display: inline-block;
      margin-top: 0.25rem;
    }

    .stat-change.positive {
      color: var(--success-color);
    }

    .stat-change.negative {
      color: var(--danger-color);
    }

    .stat-label {
      color: var(--gray-600);
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }

    @media (max-width: 968px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }
    }

    .recent-activity-section, .quick-actions-section {
      background: var(--white);
      padding: 1.75rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.07);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: var(--dark-color);
    }

    .view-all-link {
      color: var(--primary-color);
      font-weight: 500;
      font-size: 0.9rem;
      text-decoration: none;
      transition: color 0.2s;
    }

    .view-all-link:hover {
      color: #0056b3;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s;
    }

    .activity-item:hover {
      background: var(--gray-100);
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .activity-icon.icon-transfer { background: #e3f2fd; }
    .activity-icon.icon-payment { background: #fff3e0; }
    .activity-icon.icon-deposit { background: #e8f5e9; }

    .activity-details {
      flex: 1;
    }

    .activity-title {
      margin: 0;
      font-weight: 500;
      color: var(--dark-color);
    }

    .activity-date {
      margin: 0.25rem 0 0 0;
      font-size: 0.8rem;
      color: var(--gray-600);
    }

    .activity-amount {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--success-color);
    }

    .activity-amount.negative {
      color: var(--danger-color);
    }

    .quick-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 1.5rem 1rem;
      background: var(--gray-100);
      border: 2px solid transparent;
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn:hover {
      background: var(--white);
      border-color: var(--primary-color);
      transform: translateY(-2px);
    }

    .action-icon {
      font-size: 2rem;
    }

    .action-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--dark-color);
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      gap: 1rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid var(--gray-300);
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 3rem 2rem;
      background: var(--white);
      border-radius: 1rem;
      text-align: center;
    }

    .error-icon {
      font-size: 3rem;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
      text-align: center;
    }

    .empty-icon {
      font-size: 3rem;
      opacity: 0.5;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);

  loading = false;
  error = '';
  currentDate = new Date();

  stats: DashboardStats = {
    totalBalance: 0,
    activeAccounts: 0,
    recentTransactions: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0
  };

  recentTransactions: any[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    // For now, use mock data - will be replaced with real API calls
    setTimeout(() => {
      this.stats = {
        totalBalance: 25234.56,
        activeAccounts: 3,
        recentTransactions: 24,
        monthlyIncome: 8500.00,
        monthlyExpenses: 4234.50
      };

      this.recentTransactions = [
        {
          id: '1',
          description: 'Transfer to Savings Account',
          type: 'transfer',
          amount: -500.00,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: '2',
          description: 'Salary Deposit',
          type: 'deposit',
          amount: 3500.00,
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          id: '3',
          description: 'Electricity Bill Payment',
          type: 'payment',
          amount: -150.00,
          created_at: new Date(Date.now() - 48 * 60 * 60 * 1000)
        },
        {
          id: '4',
          description: 'Online Shopping',
          type: 'payment',
          amount: -89.99,
          created_at: new Date(Date.now() - 72 * 60 * 60 * 1000)
        },
        {
          id: '5',
          description: 'Freelance Project Payment',
          type: 'deposit',
          amount: 1200.00,
          created_at: new Date(Date.now() - 96 * 60 * 60 * 1000)
        }
      ];

      this.loading = false;
    }, 800);
  }

  getTransactionIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'transfer': '🔄',
      'payment': '💳',
      'deposit': '💵'
    };
    return icons[type] || '📝';
  }
}
