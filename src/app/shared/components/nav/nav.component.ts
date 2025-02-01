import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {FavoritesService} from "../../../core/service/favorites.service";
import {CartService} from "../../../core/service/cart.service";

@Component({
    selector: 'app-nav',
    imports: [RouterModule, AsyncPipe],
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: true
})
export class NavComponent {
    constructor(
        protected favoritesService: FavoritesService,
        protected cartService: CartService
    ) {}
}
