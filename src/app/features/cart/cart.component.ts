import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/components/header/header.component";

interface CartItem {
  image: string;
  model: string;
  price: number;
  stylist: string;
  quantity: number;
  rating: number;
  reviews: number;
}

@Component({
  selector: 'app-carts',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  billingForm: FormGroup;
  cartItems: CartItem[] = [
    {
      image: "assets/images/products/dress1.jpg",
      model: 'Asgaard sofa',
      price: 25000,
      stylist: 'Alicia tina',
      quantity: 1,
      rating: 4.5,
      reviews: 45
    },
    {
      image: "assets/images/products/dress3.jpg",
      model: 'Robette',
      price: 15000,
      stylist: 'Vanessa Torcheou',
      quantity: 1,
      rating: 4.5,
      reviews: 450
    }
  ];

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      expirationDate: [''],
      cardHolder: [''],
      cvc: [''],
      marketing: [false],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.billingForm.valid) {
      console.log(this.billingForm.value);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getRentalPrice(): number {
    const taxPercentage = 0.8;
    const subTotal = this.getTotal();
    const taxAmount = subTotal * taxPercentage / 100;
    return subTotal + taxAmount;
  }

  updateQuantity(event: Event, item: CartItem): void {
    const input = event.target as HTMLInputElement;
    item.quantity = parseInt(input.value, 10);
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }
}
