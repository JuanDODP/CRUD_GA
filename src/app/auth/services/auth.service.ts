import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interface/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);
  private http = inject(HttpClient);

checkstatusResource = rxResource({
  params: () => ({}), // Ajusta según tus necesidades
  stream: () => this.checkStatus(), // Cambia loader a stream
});


  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });
  user = computed(() => this._user());
  token = computed(() => this._token());
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { email, password }).pipe(
      map((resp) => this.handleLoginSuccess(resp)),
      // map(() => true),
      catchError((error: any) => this.handleAuthError(error))
    );
  }
  // verificar el token

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this._authStatus.set('not-authenticated');
      return of(false);
    }
    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).pipe(
      map((resp) => this.handleLoginSuccess(resp)),
      // map(() => true),
      catchError((error: any) => this.handleAuthError(error))
    );
  }
  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }
  private handleLoginSuccess(resp: AuthResponse) {
    const { user, token } = resp;
    this._user.set(user);
    this._token.set(token);
    localStorage.setItem('token', token);
    this._authStatus.set('authenticated');
    return true;
  }
  private handleAuthError(err: any) {
    this.logout();
    return of(false);
  }
}
