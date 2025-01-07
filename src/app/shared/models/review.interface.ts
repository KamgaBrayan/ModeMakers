export interface UserReview {
    username: string;
    rating: number; // Valeur entre 1 et 5
    comment: string;
    date: Date;
  }
  
  export interface Review{
    id: number;
    user:{
      user_id: number;
      user_name: string;
    };
    product:{
      product_note: number;
      product_id: number;
    };
    comment: string,
    date: string;
  }