import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "../../core/service/payment.service";
import {CartService} from "../../core/service/cart.service";

@Component({
    selector: 'app-checkout-success',
    imports: [CommonModule],
    templateUrl: './checkout-success.component.html',
    standalone: true,
    styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private paymentService: PaymentService,
        private cartService: CartService
    ) {}

    ngOnInit() {
        const sessionId = this.route.snapshot.queryParamMap.get('session_id');

        if (sessionId) {
            /*this.paymentService.verifyPayment(sessionId).subscribe({
                next: () => {
                    // Clear the cart after successful payment
                    this.cartService.clearCart();
                },
                error: () => {
                    this.router.navigate(['/cart']);
                }
            });*/
        } else {
            this.router.navigate(['/cart']);
        }
    }
}
