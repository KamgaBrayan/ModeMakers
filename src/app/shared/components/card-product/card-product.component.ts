import {Component, Input} from '@angular/core';
import {Product} from "../../interfaces/product.interface";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-card-product',
    imports: [
        RouterLink,
        NgForOf,
        ReactiveFormsModule
    ],
    templateUrl: './card-product.component.html',
    standalone: true,
    styleUrl: './card-product.component.css'
})
export class CardProductComponent {
    @Input() product!: Product;
    @Input() productId!: number;
}

