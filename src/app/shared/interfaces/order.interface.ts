import {Payment} from './payment.interface';

export interface Order {
  id: number;
  payment: Payment;
  createdAt: string;
  updatedAt: string;
}
