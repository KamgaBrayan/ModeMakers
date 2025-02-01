import {Payment} from './payment.interface';
import { User } from './user.interface';

export interface Order {
  id: string;
  user: {
    id: string;
    user_name: string;
    avatar?: string;
  };
  payment: {
    total: number;
    method: string;
    status: 'pending' | 'completed' | 'failed';
  };
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  completionRate: number;
  monthlyStats: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
}
