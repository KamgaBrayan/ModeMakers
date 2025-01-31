import {Material} from './material.interface';
import {Measurement} from './measurement.interface';
import {User} from './user.interface';

export interface PreOrder {
  id: number;
  photos: string[];
  utils: Array<Material & { quantity: number }>;
  createdAt: string;
  updatedAt: string;
  day: number;
  workforce: number;
  mesure: Measurement;
  user: User;
  gender: 'male' | 'female';
  location: string;
  specification: string;
  status: 'pending' | 'reviewed' | 'confirmed';
}
