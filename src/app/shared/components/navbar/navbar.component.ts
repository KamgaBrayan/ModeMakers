import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AsyncPipe, NgIf} from "@angular/common";
import {FavoritesService} from "../../../core/service/favorites.service";
import {CartService} from "../../../core/service/cart.service";

@Component({
  selector: 'app-navbar',
    imports: [RouterModule, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
    isDropdownOpen: boolean = false;
    constructor(
        protected favoritesService: FavoritesService,
        protected cartService: CartService,
        private router: Router
    ) {}

    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    goToProfile(): void {
        this.isDropdownOpen = false;
        this.router.navigate(['/user-dashboard']);
    }
}
