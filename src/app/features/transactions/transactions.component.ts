import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="transactions">
      <h2>Transaction History</h2>

      <div class="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            @for (txn of transactions; track txn.id) {
              <tr>
                <td>{{ txn.date }}</td>
                <td>{{ txn.description }}</td>
                <td>
                  <span class="badge" [class]="'badge-' + txn.type">
                    {{ txn.type }}
                  </span>
                </td>
                <td [class.negative]="txn.amount < 0">
                  {{ txn.amount | currency }}
                </td>
                <td>
                  <span class="status" [class]="'status-' + txn.status">
                    {{ txn.status }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .transactions {
      padding: 2rem 0;
    }

    h2 {
      margin-bottom: 2rem;
    }

    .transactions-table {
      background: var(--white);
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: var(--gray-100);
    }

    th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: var(--dark-color);
      border-bottom: 2px solid var(--gray-300);
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid var(--gray-200);
    }

    tbody tr:hover {
      background: var(--gray-100);
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    .badge-transfer {
      background: var(--info-color);
      color: var(--white);
    }

    .badge-payment {
      background: var(--warning-color);
      color: var(--dark-color);
    }

    .badge-deposit {
      background: var(--success-color);
      color: var(--white);
    }

    .negative {
      color: var(--danger-color);
    }

    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status-completed {
      background: #d4edda;
      color: #155724;
    }

    .status-pending {
      background: #fff3cd;
      color: #856404;
    }

    .status-failed {
      background: #f8d7da;
      color: #721c24;
    }
  `]
})
export class TransactionsComponent {
  transactions = [
    {
      id: '1',
      date: '2025-10-26',
      description: 'Transfer to John Doe',
      type: 'transfer',
      amount: -250.00,
      status: 'completed'
    },
    {
      id: '2',
      date: '2025-10-25',
      description: 'Salary Deposit',
      type: 'deposit',
      amount: 3500.00,
      status: 'completed'
    },
    {
      id: '3',
      date: '2025-10-24',
      description: 'Electricity Bill',
      type: 'payment',
      amount: -150.00,
      status: 'completed'
    },
    {
      id: '4',
      date: '2025-10-23',
      description: 'Online Purchase',
      type: 'payment',
      amount: -89.99,
      status: 'pending'
    }
  ];
}
