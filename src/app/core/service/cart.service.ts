// src/app/core/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);

    constructor() {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
            this.cartSubject.next(this.cartItems);
            this.calculateTotal();
        }
    }

    getCart(): Observable<CartItem[]> {
        return this.cartSubject.asObservable();
    }

    getTotal(): Observable<number> {
        return this.totalSubject.asObservable();
    }

    addToCart(product: Product, quantity: number = 1): void {
        const existingItem = this.cartItems.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cartItems.push({ product, quantity });
        }

        this.updateCart();
    }

    removeFromCart(productId: number): void {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
        this.updateCart();
    }

    updateQuantity(productId: number, quantity: number): void {
        const item = this.cartItems.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
            this.updateCart();
        }
    }

    clearCart(): void {
        this.cartItems = [];
        this.updateCart();
    }

    private updateCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.cartSubject.next(this.cartItems);
        this.calculateTotal();
    }

    private calculateTotal(): void {
        const total = this.cartItems.reduce((sum, item) =>
            sum + (item.product.delivery[0].price * item.quantity), 0);
        this.totalSubject.next(total);
    }
}

