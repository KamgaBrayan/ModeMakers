import {Component, Input} from '@angular/core';
import {Product} from "../../interfaces/product.interface";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-card-product',
    imports: [
        RouterLink,
<<<<<<< HEAD
        CommonModule,
=======
>>>>>>> 01110bd6a19c2bfc891fa47a1d0f5537f88a2e93
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

