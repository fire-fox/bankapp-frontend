import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Transaction {
  transaction_id: string;
  from_account_id: string;
  to_account_id: string;
  transaction_type: 'transfer' | 'payment' | 'deposit' | 'withdrawal';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';
  description?: string;
  reference_number: string;
  created_at: string;
  processed_at?: string;
  completed_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions(accountId?: string, status?: string, limit: number = 10, offset: number = 0): Observable<{ data: Transaction[] }> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (accountId) {
      params = params.set('account_id', accountId);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<{ data: Transaction[] }>(this.apiUrl, { params });
  }

  getTransactionById(id: string): Observable<{ data: Transaction }> {
    return this.http.get<{ data: Transaction }>(`${this.apiUrl}/${id}`);
  }

  createTransfer(fromAccountId: string, toAccountId: string, amount: number, description?: string): Observable<{ message: string; data: Transaction }> {
    return this.http.post<{ message: string; data: Transaction }>(`${this.apiUrl}/transfer`, {
      from_account_id: fromAccountId,
      to_account_id: toAccountId,
      amount,
      description
    });
  }

  updateTransactionStatus(id: string, status: 'pending' | 'processing' | 'completed' | 'failed' | 'reversed'): Observable<{ message: string; data: Transaction }> {
    return this.http.patch<{ message: string; data: Transaction }>(`${this.apiUrl}/${id}/status`, {
      status
    });
  }

  reverseTransaction(id: string): Observable<{ message: string; data: Transaction }> {
    return this.http.post<{ message: string; data: Transaction }>(`${this.apiUrl}/${id}/reverse`, {});
  }
}
