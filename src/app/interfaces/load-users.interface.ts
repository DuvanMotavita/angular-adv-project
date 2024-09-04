import { User } from '../models/users.model';

export interface LoadUser {
  total: number;
  user: User[];
}
