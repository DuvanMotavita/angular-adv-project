interface _HospitalUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Hospital {
  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _HospitalUser
  ) {}
}

export interface HospitalInterface {
  ok: boolean;
  hospitals: Hospital[];
  uid: string;
}

export interface Hospitals {
  _id: string;
  name: string;
  user: _HospitalUser;
}
