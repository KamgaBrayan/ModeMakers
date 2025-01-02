 
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
    };
    rating: number;
    views: number;
  }
    
  export interface Stylist {
    id: number;
    name: string;
    photos: string[];
    biography: string;
    calendar: string[];
    experience: string;
    localisation: string;
    phone: string;
    rating: number;
    specialty: string;
    category: string[];
    views: number;
    workforce: number[]; //La main d'oeuvre
  }
  