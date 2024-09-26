import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Hospital, HospitalInterface } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private http: HttpClient = inject(HttpClient);

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

  loadHospitals() {
    const url: string = `${base_url}/hospitals`;
    return this.http
      .get<HospitalInterface>(url, this.headers)
      .pipe(map((resp: HospitalInterface) => resp.hospitals));
  }

  createHospitals(name: string) {
    const url: string = `${base_url}/hospitals`;
    return this.http.post<HospitalInterface>(url, { name }, this.headers);
  }
  updateHospital(_id: string, name: string) {
    const url: string = `${base_url}/hospitals/${_id}`;
    return this.http.put<HospitalInterface>(url, { name }, this.headers);
  }
  deleteHospital(_id: string) {
    const url: string = `${base_url}/hospitals/${_id}`;
    return this.http.delete<HospitalInterface>(url, this.headers);
  }
}
