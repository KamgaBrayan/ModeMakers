import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {FavoritesService} from "../../../core/service/favorites.service";
import {CartService} from "../../../core/service/cart.service";

@Component({
  selector: 'app-navbar',
    imports: [RouterModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
    constructor(
        protected favoritesService: FavoritesService,
        protected cartService: CartService
    ) {}
}
