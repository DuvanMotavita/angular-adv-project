import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register.interface';
import { environment } from '../../environments/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { User } from '../models/users.model';
import { LoadUser } from '../interfaces/load-users.interface';
declare const google: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //Injections
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  public user: User | undefined;

  constructor() {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.user?.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  logout(): void {
    localStorage.removeItem('token');

    google.accounts.id.revoke('duvanmotavita@gmail.com', () => {
      this.router.navigateByUrl('/login');
    });
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        tap((resp: any) => {
          const { email, google, name, role, img = '', uid } = resp.user;
          this.user = new User(name, email, '', img, google, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        // map((resp) => true),
        catchError((error) => of(false))
      );
  }

  createUser(formData: RegisterForm): Observable<Object> {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  login(formData: LoginForm): Observable<Object> {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  updateUser(data: {
    email: string;
    name: string;
    role: string;
  }): Observable<Object> {
    data = { ...data, role: this.user?.role! };

    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  loginGoogle(token: string): Observable<Object> {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        console.log(resp);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loadUsers(from: number = 0) {
    const url: string = `${base_url}/users?from=${from}`;
    return this.http.get<LoadUser>(url, this.headers).pipe(
      map((resp) => {
        const users = resp.user.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return {
          total: resp.total,
          user: users,
        };
      })
    );
  }
  public deleteUser(user: User) {
    const url: string = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  saveUser(user: User): Observable<Object> {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }
}
