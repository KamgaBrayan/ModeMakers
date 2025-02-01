import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../../interfaces/product.interface";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FavoritesService } from "../../../core/service/favorites.service";
import { CartService } from "../../../core/service/cart.service";
import {AlertComponent} from "../alert/alert.component";
import {AlertService} from "../../../core/service/alert.service";

@Component({
    selector: 'app-card-product',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        AlertComponent
    ],
    templateUrl: './card-product.component.html',
    standalone: true,
    styleUrl: './card-product.component.css'
})
export class CardProductComponent implements OnInit {
    @Input() product!: Product;
    @Input() productId!: number;
    isFavorite: boolean = false;

    constructor(
        private favoritesService: FavoritesService,
        private cartService: CartService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.isFavorite = this.favoritesService.isFavorite(this.productId);
    }

    toggleFavorite(): void {
        this.isFavorite = this.favoritesService.toggleFavorite(this.product);
        this.alertService.showAlert(
            this.isFavorite ? 'Produit ajouté aux favoris' : 'Produit retiré des favoris'
        );
    }

    addToCart(): void {
        this.cartService.addToCart(this.product);
        this.alertService.showAlert('Produit ajouté au panier');
    }
}
