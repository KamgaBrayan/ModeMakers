import {PreOrder} from './preOrder.interface';

export interface Payment {
  id: number;
  paymentMethod: string;
  account: number;
  createdAt: string;
  status: 'pending' | 'canceled' | 'confirmed';
  preOrder: PreOrder;
}
