interface Product {
  id: number;
  name: string;
  gender: string;
  age: string;
  publishedDate: string;
  createdAt: string;
  description: string;
  category: string;
  rating: number;
  isAvailable: boolean;
  images: string[];
  delivery: Delivery[];
  materials: Material[];
  user: StylistUser;
}
