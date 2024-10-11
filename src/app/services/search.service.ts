import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';
import { Hospital } from '../models/hospital.model';
import { Medic } from '../models/medic.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
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
  }
  private transformHospitals(results: any[]): Hospital[] {
    return results;
  }
  private transformMedics(results: any[]): Medic[] {
    return results;
  }

  public globalSearch(term: string) {
    const url: string = `${base_url}/all/${term}`;
    return this.http.get<any[]>(url, this.headers);
  }

  public search(
    type: 'users' | 'medics' | 'hospitals',
    term: string
  ): Observable<any[]> {
    const url: string = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(resp.results);
          case 'hospitals':
            return this.transformHospitals(resp.results);
          case 'medics':
            return this.transformMedics(resp.results);
          default:
            return [];
        }
      })
    );
  }
}
