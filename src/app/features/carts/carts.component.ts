import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {CartItem, CartService} from "../../core/service/cart.service";
import {Product} from "../../shared/interfaces/product.interface";
import {Delivery} from "../../shared/interfaces/delivery.interface";


interface CartItemWithDelivery extends CartItem {
    selectedDeliveryType?: string;
}

@Component({
    selector: 'app-cart',
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NavbarComponent,
        FooterComponent
    ],
    templateUrl: './carts.component.html',
    standalone: true,
    styleUrl: './carts.component.css'
})

export class CartsComponent implements OnInit, OnDestroy {
    cartItems: CartItem[] = [];
    total: number = 0;
    currentStep = 1;
    isLoading = false;
    alert = { show: false, type: '', message: '' };
    private subscription: Subscription = new Subscription();

    steps = [
        { title: 'Panier', icon: 'fas fa-shopping-cart' },
        { title: 'Livraison', icon: 'fas fa-truck' },
        { title: 'Paiement', icon: 'fas fa-credit-card' },
        { title: 'Confirmation', icon: 'fas fa-check-circle' }
    ];

    shippingForm: FormGroup;
    paymentForm: FormGroup;

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder
    ) {
        this.shippingForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{8,15}$/)]]
        });

        this.paymentForm = this.formBuilder.group({
            paymentMethod: ['momo', Validators.required],
            paymentNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9,16}$/)]]
        });
    }

    ngOnInit(): void {
        this.subscription.add(
            this.cartService.getCart().subscribe(items => {
                this.cartItems = items;
            })
        );

        this.subscription.add(
            this.cartService.getTotal().subscribe(total => {
                this.total = total;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getStepClass(index: number): string {
        return `w-8 h-8 flex items-center justify-center rounded-full ${
            this.currentStep > index
                ? 'bg-indigo-600 text-white'
                : this.currentStep === index
                    ? 'bg-blue-300 text-white'
                    : 'bg-gray-200 text-gray-600'
        }`;
    }

    getDeliveryPrice(item: CartItemWithDelivery): number {
        const selectedType = this.getSelectedDeliveryType(item);
        const delivery = item.product.delivery.find(d => d.type === selectedType) ||
            item.product.delivery.find(d => d.type === 'standard') ||
            item.product.delivery[0];
        return delivery.price;
    }

    getItemTotal(item: CartItemWithDelivery): number {
        const deliveryPrice = this.getDeliveryPrice(item);
        return deliveryPrice * item.quantity;
    }

    updateQuantity(product: Product, quantity: number): void {
        if (quantity < 1) return;
        this.cartService.addToCart(product, quantity - this.cartItems.find(item =>
            item.product.id === product.id)!.quantity);
    }

    removeFromCart(product: Product): void {
        const index = this.cartItems.findIndex(item => item.product.id === product.id);
        if (index !== -1) {
            this.cartItems.splice(index, 1);
            this.updateCart();
            this.showAlert('success', 'Produit retiré du panier');
        }
    }

    showAlert(type: string, message: string): void {
        this.alert = { show: true, type, message };
        setTimeout(() => {
            this.alert.show = false;
        }, 3000);
    }

    async nextStep(): Promise<void> {
        if (this.currentStep === 1 && this.cartItems.length === 0) {
            this.showAlert('error', 'Votre panier est vide');
            return;
        }

        if (this.currentStep === 2 && !this.shippingForm.valid) {
            this.showAlert('error', 'Veuillez remplir tous les champs de livraison correctement');
            return;
        }

        if (this.currentStep === 3) {
            if (!this.paymentForm.valid) {
                this.showAlert('error', 'Informations de paiement invalides');
                return;
            }

            // Simulate payment processing
            this.isLoading = true;
            try {
                await this.processPayment();
                this.isLoading = false;
                this.currentStep++;
                // Clear cart after successful payment
                this.cartItems = [];
                this.updateCart();
            } catch (error) {
                this.isLoading = false;
                this.showAlert('error', 'Erreur lors du traitement du paiement');
                return;
            }
        } else {
            this.currentStep++;
        }
    }

    previousStep(): void {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    private updateCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.cartService.getTotal(); // Trigger total recalculation
    }

    private async processPayment(): Promise<void> {
        // Simulate API call to payment gateway
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate
                if (success) {
                    resolve();
                } else {
                    reject(new Error('Payment failed'));
                }
            }, 2000);
        });
    }

    // Helper method to check if form control is invalid and touched
    isInvalid(formGroup: FormGroup, controlName: string): boolean {
        const control = formGroup.get(controlName);
        return control ? control.invalid && control.touched : false;
    }


    getSelectedDeliveryType(item: CartItemWithDelivery): string {
        return item.selectedDeliveryType || 'standard' || item.product.delivery[0].type;
    }

    updateDeliveryType(item: CartItemWithDelivery, delivery: Delivery): void {
        item.selectedDeliveryType = delivery.type;
        this.calculateTotals();
    }

    getSubTotal(): number {
        return this.cartItems.reduce((sum, item) =>
            sum + this.getDeliveryPrice(item) * item.quantity, 0);
    }

    getDeliveryTotal(): number {
        const percentage = 0.01;
        return this.getSubTotal() * percentage;
    }

    private calculateTotals(): void {
        const subTotal = this.getSubTotal();
        const deliveryTotal = this.getDeliveryTotal();
        this.total = subTotal + deliveryTotal;
    }

    getTotal(): number {
        return this.getSubTotal() + this.getDeliveryTotal();
    }

    // Getters for form validation
    get isShippingFormValid(): boolean {
        return this.shippingForm.valid;
    }

    get isPaymentFormValid(): boolean {
        return this.paymentForm.valid;
    }
}
