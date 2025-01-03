export interface TopSellingModel {
  id: number;
  name: string;
  description?: string;
  image: string;
  price: number;
  stock?: number;
  category?: string;
  status: string;
  sales: number;
  amount: number;
  sku?: string;
  created_at?: string;
  updated_at?: string;
}
