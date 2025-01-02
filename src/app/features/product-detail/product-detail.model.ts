 
export   interface Product {
    id: number;
    name: string;
    gender: string;
    age: string; // Vous pouvez adapter le type en fonction des valeurs possibles, comme 'Range' ou 'Child'
    category: string;
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
    views: number;
  }
  