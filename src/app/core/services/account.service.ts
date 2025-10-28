import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Account {
  account_id: string;
  user_id: string;
  account_number: string;
  account_type: 'checking' | 'savings' | 'business';
  balance: number;
  currency: string;
  status: 'active' | 'suspended' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface AccountBalance {
  account_id: string;
  account_number: string;
  balance: number;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/accounts`;

  constructor(private http: HttpClient) {}

  getAccounts(userId?: string, limit: number = 10, offset: number = 0): Observable<{ data: Account[] }> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (userId) {
      params = params.set('user_id', userId);
    }

    return this.http.get<{ data: Account[] }>(this.apiUrl, { params });
  }

  getAccountById(id: string): Observable<{ data: Account }> {
    return this.http.get<{ data: Account }>(`${this.apiUrl}/${id}`);
  }

  getAccountBalance(id: string): Observable<{ data: AccountBalance }> {
    return this.http.get<{ data: AccountBalance }>(`${this.apiUrl}/${id}/balance`);
  }

  createAccount(userId: string, accountType: 'checking' | 'savings' | 'business'): Observable<{ message: string; data: Account }> {
    return this.http.post<{ message: string; data: Account }>(this.apiUrl, {
      user_id: userId,
      account_type: accountType
    });
  }

  updateAccountStatus(id: string, status: 'active' | 'suspended' | 'closed'): Observable<{ message: string; data: Account }> {
    return this.http.patch<{ message: string; data: Account }>(`${this.apiUrl}/${id}/status`, {
      status
    });
  }
}
