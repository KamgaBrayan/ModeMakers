export interface Material {
    id: number;
    name: string;
    photos: string[];
    description: string;
    price_per_square_meter: number;
    color: string[];
  }


export interface ReduceMaterial{
    name: string; 
    photo: string;
    price_per_square_meter: number 
}
