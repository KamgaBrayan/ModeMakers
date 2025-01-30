import {Product} from './product.interface';
import {User} from './user.interface';
export interface Preferences {
  id: number;
  user: User;
  product: Product[];
}
