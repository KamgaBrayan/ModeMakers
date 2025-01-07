export   interface Product {
    id: number;
    name: string;
    gender: string;
    age: string;
    photos: string[];
    description: string;
    price: number;
    price_per_square_metter: number;
    stylist: {
      id: number;
      name: string;
    };
    material: {
      id: number;
      type: string;
    }[];
    rating: number;
    workforce: string[];
    views: number;
    // requiredMeasures: Partial<Record<MeasureKey, boolean>>; // Dictionnaire des mesures requises
  }