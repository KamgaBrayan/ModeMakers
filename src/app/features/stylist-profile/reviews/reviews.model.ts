// src/app/features/stylist-profile/reviews/review.model.ts
export interface Review {
    id: number; // Unique identifier for the review
    user: {
      user_id: number; // Unique identifier for the user
      user_name: string; // User's name
    };
    product: {
      product_note: number; // Rating given to the product
      product_id: number; // Unique identifier for the product
    };
    comment: string; // User's comment on the product
    date: string; // Review date in ISO 8601 format
  }