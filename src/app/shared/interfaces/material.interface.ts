export interface Material {
  id: number;
  name: string;
  type: string;
  photos: string[];
  price_per_square_meter: number;
  descrtption: string; // Note: Typo in original spec
}
