# Product Routes

## Base Routes
- `GET /product` - Get all products
- `POST /product` - Create product
- `PUT /product` - Update product
- `GET /product/{id}` - Get product by ID
- `DELETE /product/{id}` - Delete product
- `GET /stylists/{id}/Products` - Get products by stylist ID

### Product Response Structure
```json
{
  "id": 1,
  "name": "Elegant Summer Dress",
  "gender": "Female",
  "age": "Ranges",
  "publishedDate": "16/11/2022",
  "createdAt": "16/11/2022",
  "description": "Beautiful floral summer dress perfect for any occasion",
  "category": "Women",
  "rating": 4.5,
  "isAvailable": true,
  "images": [
    "assets/images/products/dress1.jpg",
    "assets/images/products/dress2.jpg",
    "assets/images/products/dress3.jpg",
    "assets/images/products/dress4.jpg"
  ],
  "delivery": [
    {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"},
    {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"},
    {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"}
  ],
  "materials": [
    {"id": 1, "name": "Satin", "type": "coton", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "descrtption": "test"},
    {"id": 2, "name": "Microfiber", "type": "tissu", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "descrtption": "test"},
    {"id": 3, "name": "Polyester", "type": "sik", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "descrtption": "test"},
    {"id": 4, "name": "Cotton", "type": "coton", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "descrtption": "test"}
  ],
  "user": {
    "id": 1,
    "name": "John Doe",
    "roles": ["ROLE_STYLIST"],
    "specialty": "Hair Stylist",
    "photos": ["/images/stylists/stylist_1.jpg"],
    "biography": "John is a talented hair stylist with over 10 years of experience in the industry. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam labore maxime aperiam alias commodi quisquam. Quos quibusdam autem, dolor, error cumque perferendis animi deleniti tenetur harum odio porro facere praesentium.",
    "calendar": ["monday", "wednesday", "friday"],
    "experience": "10 years of experience in cutting, coloring, and styling hair.",
    "localisation": "Paris, France",
    "phone": "0123456789",
    "category": ["Homme", "Femme"]
  }
}
```

# Pre-order Routes

## Base Routes
- `GET /precommande/user/{id}` - Get preorders by user ID
- `GET /precommande/stylist/{id}` - Get preorders by stylist ID
- `POST /precommande` - Create preorder
- `GET /precommande/{id}` - Get preorder by ID
- `PATCH /precommande/{id}` - Update preorder
- `DELETE /precommande/{id}` - Delete preorder

### Pre-order Response Structure
```json
{
  "id": 1,
  "photos": ["assets/images/dress,jpg"],
  "utils": [
    {"name": "Satin", "type": "coton", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1},
    {"name": "Microfiber", "type": "tissu", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1},
    {"name": "Polyester", "type": "sik", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1},
    {"name": "Cotton", "type": "coton", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1}
  ],
  "createdAt": "2024-03-10",
  "updatedAt": "2024-03-10",
  "day": 14,
  "workforce": 15000,
  "mesure": {
    "id": 1,
    "title": "titre de la mesure pour l'eregistrement",
    "user": {
      "user_id": 1,
      "user_name": "Gabriel Nomo",
      "roles": ["ROLE_USER"]
    },
    "stature": 1.75,
    "shoulder_circumference": 105.5,
    "chest_circumference": 95.0,
    "waist_circumference": 85.0,
    "hip_circumference": 98.0,
    "shoulder_height": 120.0,
    "hip_height": 90.0,
    "knee_height": 55.0,
    "chest_spacing": 18.0,
    "breast_height": 105.0,
    "pelvis_height": 100.0,
    "front_waist_length": 40.0,
    "shoulder_length": 45.0,
    "back_waist_length": 50.0,
    "arm_length": 60.0,
    "total_arm_length_bent": 70.0,
    "wrist_circumference": 18.0,
    "ankle_height": 22.0,
    "seated_height": 45.0,
    "crotch_length": 30.0,
    "date_measure": "2024-12-29T10:00:00Z"
  },
  "user": {
    "id": 2,
    "user_name": "Sophie Chen"
  },
  "gender": "male",
  "location": "test",
  "specification": "description of the model",
  "status": "enum(pending, reviewed, confirmed)",
  "user": {
    "id": 1,
    "name": "John Doe",
    "roles": ["ROLE_STYLIST"],
    "specialty": "Hair Stylist",
    "photos": ["/images/stylists/stylist_1.jpg"],
    "biography": "John is a talented hair stylist with over 10 years of experience in the industry. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam labore maxime aperiam alias commodi quisquam. Quos quibusdam autem, dolor, error cumque perferendis animi deleniti tenetur harum odio porro facere praesentium.",
    "calendar": ["monday", "wednesday", "friday"],
    "experience": "10 years of experience in cutting, coloring, and styling hair.",
    "localisation": "Paris, France",
    "phone": "0123456789",
    "category": ["Homme", "Femme"]
  }
}
```

# Order Routes

## Base Routes
- `GET /command/user/{id}` - Get orders by user ID
- `GET /command/stylist/{id}` - Get orders by stylist ID
- `POST /command` - Create order
- `GET /command/{id}` - Get order by ID
- `GET /command/{id}/print` - Print order

### Order Response Structure
```json
{
  "id": 1,
  "payment": {
    "id": 1,
    "paymentMethod": "",
    "account": 20000,
    "createdAt": "2024-03-10",
    "status": "enum(pending, canceled, confirmed)"
  },
  "preOrder": {
    "id": 1,
    "photos": ["assets/images/dress,jpg"],
    "utils": [
      {"name": "Satin", "type": "coton", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1},
      {"name": "Microfiber", "type": "tissu", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1},
      {"name": "Polyester", "type": "sik", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1},
      {"name": "Cotton", "type": "coton", "photos": ["assets/images/products/dress4.jpg"], "price_per_square_meter": 1000, "quantity": 1}
    ],
    "createdAt": "2024-03-10",
    "updatedAt": "2024-03-10",
    "day": 14,
    "workforce": 15000,
    "mesure": {
      "id": 1,
      "title": "titre de la mesure pour l'eregistrement",
      "user": {
        "user_id": 1,
        "user_name": "Gabriel Nomo"
      },
      "stature": 1.75,
      "shoulder_circumference": 105.5,
      "chest_circumference": 95.0,
      "waist_circumference": 85.0,
      "hip_circumference": 98.0,
      "shoulder_height": 120.0,
      "hip_height": 90.0,
      "knee_height": 55.0,
      "chest_spacing": 18.0,
      "breast_height": 105.0,
      "pelvis_height": 100.0,
      "front_waist_length": 40.0,
      "shoulder_length": 45.0,
      "back_waist_length": 50.0,
      "arm_length": 60.0,
      "total_arm_length_bent": 70.0,
      "wrist_circumference": 18.0,
      "ankle_height": 22.0,
      "seated_height": 45.0,
      "crotch_length": 30.0,
      "date_measure": "2024-12-29T10:00:00Z"
    },
    "user": {
      "id": 2,
      "user_name": "Sophie Chen"
    },
    "gender": "male",
    "location": "test",
    "specification": "description of the model",
    "status": "enum(pending, reviewed, confirmed)",
    "user": {
      "id": 1,
      "roles": ["ROLE_STYLIST"],
      "name": "John Doe",
      "specialty": "Hair Stylist",
      "photos": ["/images/stylists/stylist_1.jpg"],
      "biography": "John is a talented hair stylist with over 10 years of experience in the industry. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam labore maxime aperiam alias commodi quisquam. Quos quibusdam autem, dolor, error cumque perferendis animi deleniti tenetur harum odio porro facere praesentium.",
      "calendar": ["monday", "wednesday", "friday"],
      "experience": "10 years of experience in cutting, coloring, and styling hair.",
      "localisation": "Paris, France",
      "phone": "0123456789",
      "category": ["Homme", "Femme"]
    }
  }
}
```

# Stylist Routes

## Base Routes
- `GET /stylists` - Get all stylists
- `GET /stylist/{id}` - Get stylist by ID
- `PUT /stylist/{id}` - Update stylist
- `POST /stylist` - Create stylist (register of stylist)

### Stylist Response Structure
```json
{
  "id": 1,
  "name": "John Doe",
  "roles": ["ROLE_STYLIS"],
  "specialty": "Hair Stylist",
  "photos": ["/images/stylists/stylist_1.jpg"],
  "biography": "John is a talented hair stylist with over 10 years of experience in the industry. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam labore maxime aperiam alias commodi quisquam. Quos quibusdam autem, dolor, error cumque perferendis animi deleniti tenetur harum odio porro facere praesentium.",
  "calendar": ["monday", "wednesday", "friday"],
  "experience": "10 years of experience in cutting, coloring, and styling hair.",
  "localisation": "Paris, France",
  "phone": "0123456789",
  "category": ["Homme", "Femme"]
}
```

# Material Routes

## Base Routes
- `GET /materials` - Get all materials
- `GET /material/{id}` - Get material by ID
- `PUT /material/{id}` - Update material
- `DELETE /material/{id}` - Delete material

### Material Response Structure
```json
{
  "id": 1,
  "name": "Satin",
  "type": "coton",
  "photos": ["assets/images/products/dress4.jpg"],
  "price_per_square_meter": 1000,
  "descrtption": "test"
}
```

# Review Routes

## Base Routes
- `GET /product/{id}/reviews` - Get reviews by product ID
- `POST /review` - Create review

### Review Response Structure
```json
{
  "id": 1,
  "user": {
    "user_id": 1,
    "user_name": "Gabriel Nomo",
    "roles": ["ROLE_USER"]
  },
  "rating": 5,
  "comment": "Perfect fit and beautiful material! I love it!",
  "date": "2024-03-15",
  "product": {
    "id": 1,
    "name": "Elegant Summer Dress",
    "gender": "Female",
    "age": "Ranges",
    "publishedDate": "16/11/2022",
    "createdAt": "16/11/2022",
    "description": "Beautiful floral summer dress perfect for any occasion",
    "category": "Women",
    "rating": 4.5,
    "isAvailable": true,
    "images": [
      "assets/images/products/dress1.jpg",
      "assets/images/products/dress2.jpg",
      "assets/images/products/dress3.jpg",
      "assets/images/products/dress4.jpg"
    ],
    "delivery": [
      {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"},
      {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"},
      {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"}
    ]
  }
}
```

# Notification Routes

## Base Routes
- `GET /user/{id}/notifications` - Get notifications by user ID
- `DELETE /notification/{id}` - Delete notification
- `POST /notification` - Create notification
- `GET /notification/{id}` - Get notification by ID

### Notification Response Structure
```json
{
  "id": 1,
  "user": {
    "user_id": 1,
    "user_name": "Gabriel Nomo",
    "roles": ["ROLE_USER"]
  },
  "content": "Your order has been shipped.",
  "date": "2024-12-29T10:00:00Z",
  "readed": true,
  "received": true
}
```

# Measurement Routes

## Base Routes
- `GET /user/{id}/measures` - Get measures by user ID
- `DELETE /measure/{id}` - Delete measure
- `POST /measure` - Create measure
- `GET /measure/{id}` - Get measure by ID
- `PUT /measure/{id}` - Update measure

### Measurement Response Structure
```json
{
  "id": 1,
  "title": "titre de la mesure pour l'eregistrement",
  "user": {
    "user_id": 1,
    "user_name": "Gabriel Nomo",
    "roles": ["ROLE_USER"]
  },
  "stature": 1.75,
  "shoulder_circumference": 105.5,
  "chest_circumference": 95.0,
  "waist_circumference": 85.0,
  "hip_circumference": 98.0,
  "shoulder_height": 120.0,
  "hip_height": 90.0,
  "knee_height": 55.0,
  "chest_spacing": 18.0,
  "breast_height": 105.0,
  "pelvis_height": 100.0,
  "front_waist_length": 40.0,
  "shoulder_length": 45.0,
  "back_waist_length": 50.0,
  "arm_length": 60.0,
  "total_arm_length_bent": 70.0,
  "wrist_circumference": 18.0,
  "ankle_height": 22.0,
  "seated_height": 45.0,
  "crotch_length": 30.0,
  "date_measure": "2024-12-29T10:00:00Z"
}
```

# Preferences (Favorites) Routes

## Base Routes
- `POST /product/{id}/favorite` - Add product to favorites
- `DELETE /product/{id}/favorite` - Remove product from favorites
- `GET /user/{id}/favorites` - Get favorite products by user ID

### Preferences Response Structure
```json
{
  "id": 1,
  "user": {
    "user_id": 1,
    "user_name": "Gabriel Nomo",
    "roles": ["ROLE_USER"]
  },
  "product": [
    {
      "id": 1,
      "name": "Elegant Summer Dress",
      "gender": "Female",
      "age": "Ranges",
      "publishedDate": "16/11/2022",
      "createdAt": "16/11/2022",
      "description": "Beautiful floral summer dress perfect for any occasion",
      "category": "Women",
      "rating": 4.5,
      "isAvailable": true,
      "images": [
        "assets/images/products/dress1.jpg",
        "assets/images/products/dress2.jpg",
        "assets/images/products/dress3.jpg",
        "assets/images/products/dress4.jpg"
      ],
      "delivery": [
        {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"},
        {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"},
        {"id": 1, "day": 14, "price": 15000, "type": "enum(standard, advanced, express)"}
      ]
    }
  ]
}
```

# Interfaces

```ts
// Base Types
interface User {
  id: number;
  user_name: string;
  roles: string[];
}

interface StylistUser {
  id: number;
  name: string;
  roles: string[];
  specialty: string;
  photos: string[];
  biography: string;
  calendar: string[];
  experience: string;
  localisation: string;
  phone: string;
  category: string[];
}

interface Delivery {
  id: number;
  day: number;
  price: number;
  type: 'standard' | 'advanced' | 'express';
}

interface Material {
  id: number;
  name: string;
  type: string;
  photos: string[];
  price_per_square_meter: number;
  descrtption: string; // Note: Typo in original spec
}

interface Measurement {
  id: number;
  title: string;
  user: User;
  stature: number;
  shoulder_circumference: number;
  chest_circumference: number;
  waist_circumference: number;
  hip_circumference: number;
  shoulder_height: number;
  hip_height: number;
  knee_height: number;
  chest_spacing: number;
  breast_height: number;
  pelvis_height: number;
  front_waist_length: number;
  shoulder_length: number;
  back_waist_length: number;
  arm_length: number;
  total_arm_length_bent: number;
  wrist_circumference: number;
  ankle_height: number;
  seated_height: number;
  crotch_length: number;
  date_measure: string;
}

// Main Interfaces
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

interface PreOrder {
  id: number;
  photos: string[];
  utils: Array<Material & { quantity: number }>;
  createdAt: string;
  updatedAt: string;
  day: number;
  workforce: number;
  mesure: Measurement;
  user: User;
  gender: 'male' | 'female';
  location: string;
  specification: string;
  status: 'pending' | 'reviewed' | 'confirmed';
}

interface Order {
  id: number;
  payment: Payment;
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  id: number;
  paymentMethod: string;
  account: number;
  createdAt: string;
  status: 'pending' | 'canceled' | 'confirmed';
  preOrder: PreOrder;
}

interface Review {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
  product: Product;
}

interface Notification {
  id: number;
  user: {
    user_id: number;
    user_name: string;
  };
  content: string;
  date: string;
  readed: boolean;
  received: boolean;
}

interface Preferences {
  id: number;
  user: User;
  product: Product[];
}

// API Response Types
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Request Types
interface CreateProductRequest extends Omit<Product, 'id' | 'rating'> {}
interface UpdateProductRequest extends Partial<CreateProductRequest> {}

interface CreatePreOrderRequest extends Omit<PreOrder, 'id' | 'createdAt' | 'updatedAt'> {}
interface UpdatePreOrderRequest extends Partial<CreatePreOrderRequest> {}

interface CreateOrderRequest extends Omit<Order, 'id' | 'createdAt' | 'updatedAt'> {}

interface CreateReviewRequest extends Omit<Review, 'id' | 'date'> {}

interface CreateNotificationRequest extends Omit<Notification, 'id' | 'date' | 'readed' | 'received'> {}

interface CreateMeasurementRequest extends Omit<Measurement, 'id' | 'date_measure'> {}
interface UpdateMeasurementRequest extends Partial<CreateMeasurementRequest> {}
```


# exemple d'execution des interfaces ecrit en dessous pour la creation d'un produit

```ts
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

// product.service.ts
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'api/product';

  constructor(private http: HttpClient) {}

  createProduct(productData: CreateProductRequest): Observable<Product> {
    const materials$ = productData.materials.map(material =>
      this.http.post<Material>('api/materials', material)
    );

    const delivery$ = productData.delivery.map(delivery =>
      this.http.post<Delivery>('api/delivery', delivery)
    );

    return forkJoin([
      ...materials$,
      ...delivery$
    ]).pipe(
      switchMap(responses => {
        const [materials, deliveries] = [
          responses.slice(0, productData.materials.length),
          responses.slice(productData.materials.length)
        ];

        const finalProduct = {
          ...productData,
          materials: materials,
          delivery: deliveries
        };

        return this.http.post<Product>(this.apiUrl, finalProduct);
      })
    );
  }
}

// product-form.component.ts
@Component({
  selector: 'app-product-form',
  template: `
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="max-w-4xl mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Create New Product</h2>
      
      <!-- Basic Information -->
      <div class="space-y-4 mb-6">
        <div>
          <label>Name</label>
          <input formControlName="name" class="form-input mt-1 block w-full" required>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>Gender</label>
            <select formControlName="gender" class="form-select mt-1 block w-full">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
          
          <div>
            <label>Category</label>
            <select formControlName="category" class="form-select mt-1 block w-full">
              <option value="Dresses">Dresses</option>
              <option value="Suits">Suits</option>
              <option value="Casual">Casual</option>
            </select>
          </div>
        </div>

        <div>
          <label>Description</label>
          <textarea formControlName="description" class="form-textarea mt-1 block w-full" rows="3"></textarea>
        </div>
      </div>

      <!-- Materials -->
      <div formArrayName="materials" class="mb-6">
        <h3 class="text-xl font-semibold mb-3">Materials</h3>
        <div *ngFor="let material of materials.controls; let i=index" [formGroupName]="i" class="border p-4 mb-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label>Material Name</label>
              <input formControlName="name" class="form-input mt-1 block w-full">
            </div>
            <div>
              <label>Type</label>
              <input formControlName="type" class="form-input mt-1 block w-full">
            </div>
            <div>
              <label>Price per Square Meter</label>
              <input type="number" formControlName="price_per_square_meter" class="form-input mt-1 block w-full">
            </div>
          </div>
          <button type="button" (click)="removeMaterial(i)" class="mt-2 text-red-500">Remove</button>
        </div>
        <button type="button" (click)="addMaterial()" class="btn-secondary">Add Material</button>
      </div>

      <!-- Delivery Options -->
      <div formArrayName="delivery" class="mb-6">
        <h3 class="text-xl font-semibold mb-3">Delivery Options</h3>
        <div *ngFor="let delivery of deliveryOptions.controls; let i=index" [formGroupName]="i" class="border p-4 mb-4">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label>Type</label>
              <select formControlName="type" class="form-select mt-1 block w-full">
                <option value="standard">Standard</option>
                <option value="advanced">Advanced</option>
                <option value="express">Express</option>
              </select>
            </div>
            <div>
              <label>Days</label>
              <input type="number" formControlName="day" class="form-input mt-1 block w-full">
            </div>
            <div>
              <label>Price</label>
              <input type="number" formControlName="price" class="form-input mt-1 block w-full">
            </div>
          </div>
          <button type="button" (click)="removeDelivery(i)" class="mt-2 text-red-500">Remove</button>
        </div>
        <button type="button" (click)="addDelivery()" class="btn-secondary">Add Delivery Option</button>
      </div>

      <!-- Images Upload -->
      <div class="mb-6">
        <label>Product Images</label>
        <input type="file" multiple (change)="onFileSelected($event)" accept="image/*" class="form-input mt-1 block w-full">
        <div class="grid grid-cols-4 gap-4 mt-2">
          <div *ngFor="let preview of imagePreviews" class="relative">
            <img [src]="preview" class="w-full h-32 object-cover rounded">
            <button type="button" (click)="removeImage(preview)" class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">×</button>
          </div>
        </div>
      </div>

      <button type="submit" [disabled]="productForm.invalid || isSubmitting" class="btn-primary w-full">
        {{ isSubmitting ? 'Creating...' : 'Create Product' }}
      </button>
    </form>
  `
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  imagePreviews: string[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      isAvailable: [true],
      images: [[]],
      materials: this.fb.array([]),
      delivery: this.fb.array([])
    });
  }

  get materials() {
    return this.productForm.get('materials') as FormArray;
  }

  get deliveryOptions() {
    return this.productForm.get('delivery') as FormArray;
  }

  addMaterial() {
    const materialForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price_per_square_meter: [0, [Validators.required, Validators.min(0)]],
      photos: [[]]
    });
    this.materials.push(materialForm);
  }

  addDelivery() {
    const deliveryForm = this.fb.group({
      type: ['standard', Validators.required],
      day: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
    this.deliveryOptions.push(deliveryForm);
  }

  removeMaterial(index: number) {
    this.materials.removeAt(index);
  }

  removeDelivery(index: number) {
    this.deliveryOptions.removeAt(index);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
        const currentImages = this.productForm.get('images')?.value || [];
        this.productForm.patchValue({
          images: [...currentImages, file]
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(preview: string) {
    const index = this.imagePreviews.indexOf(preview);
    if (index !== -1) {
      this.imagePreviews.splice(index, 1);
      const currentImages = this.productForm.get('images')?.value;
      currentImages.splice(index, 1);
      this.productForm.patchValue({ images: currentImages });
    }
  }

  async onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    try {
      const formData = this.productForm.value;
      const currentUser = await this.authService.getCurrentUser().toPromise();
      
      const productData: CreateProductRequest = {
        ...formData,
        user: currentUser
      };

      this.productService.createProduct(productData).subscribe(
        (response) => {
          console.log('Product created successfully:', response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error creating product:', error);
          // Handle error appropriately
        }
      ).add(() => {
        this.isSubmitting = false;
      });
    } catch (error) {
      console.error('Error:', error);
      this.isSubmitting = false;
    }
  }
}

// app-routing.module.ts
const routes: Routes = [
  { path: 'products/new', component: ProductFormComponent, canActivate: [AuthGuard] },
  // ... other routes
];
```
