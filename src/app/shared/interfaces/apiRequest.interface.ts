import {Delivery} from './delivery.interface';
import {Material} from './material.interface';
import {Product} from './product.interface';
import {PreOrder} from './preOrder.interface';
import {Order} from './order.interface';
import {Review} from './review.interface';
import {Measurement} from './measurement.interface';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface CreateMaterial extends Omit<Material, 'id'>{}
export interface UpdateMaterial extends Partial<Material>{}

export interface CreateDelivery extends Omit<Delivery, 'id'>{}
export interface UpdateDelivery extends Partial<Delivery>{}

export interface CreateProductRequest extends Omit<Product, 'id' | 'rating'> {}
export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface CreatePreOrderRequest extends Omit<PreOrder, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdatePreOrderRequest extends Partial<CreatePreOrderRequest> {}

export interface CreateOrderRequest extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CreateReviewRequest extends Omit<Review, 'id' | 'date'> {}

export interface CreateNotificationRequest extends Omit<Notification, 'id' | 'date' | 'readed' | 'received'> {}

export interface CreateMeasurementRequest extends Omit<Measurement, 'id' | 'date_measure'> {}
export interface UpdateMeasurementRequest extends Partial<CreateMeasurementRequest> {}
