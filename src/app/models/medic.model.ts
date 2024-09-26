import { Hospital } from './hospital.model';

interface _MedicUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Medic {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _MedicUser,
    public hospital?: Hospital
  ) {}
}

export interface MedicInterface {
  ok: boolean;
  medics: Medic[];
  uid: string;
}

export interface Medics {
  _id: string;
  name: string;
  user: _MedicUser;
}
