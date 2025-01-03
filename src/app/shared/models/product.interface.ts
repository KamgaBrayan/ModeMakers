export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    numberReviews: number;
    inStock: boolean;
    isFavorite: boolean;
    storeNumber: string;
    gender: string;
    age: string;
    size: string;
    color: string;
    measurementRequest: boolean;
    location: string;
    publishedDate: string;
    materials: Material[];
    images: string[];
    reviews: Review[];
    colors: string[];
}

interface Material {
  name: string;
  colors: string[];
  image: string;
}

interface Review {
  id: number;
  userName: string;
  userTitle: string;
  rating: number;
  comment: string;
  date: string;
}
