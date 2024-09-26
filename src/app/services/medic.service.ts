import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Medic, MedicInterface } from '../models/medic.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicService {
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

  loadMedics() {
    const url: string = `${base_url}/medics`;
    return this.http
      .get<MedicInterface>(url, this.headers)
      .pipe(map((resp: MedicInterface) => resp.medics));
  }
  getMedicById(id: string) {
    const url: string = `${base_url}/medics/${id}`;
    return this.http
      .get<Medic>(url, this.headers)
      .pipe(map((resp: any) => resp.medic));
  }

  createMedic(medic: { name: string; hospital: string }) {
    const url: string = `${base_url}/medics`;
    return this.http.post<MedicInterface>(url, medic, this.headers);
  }
  updateMedic(medic: Medic) {
    const url: string = `${base_url}/medics/${medic._id}`;
    return this.http.put<MedicInterface>(url, medic, this.headers);
  }
  deleteMedic(_id: string) {
    const url: string = `${base_url}/medics/${_id}`;
    return this.http.delete<MedicInterface>(url, this.headers);
  }
}
