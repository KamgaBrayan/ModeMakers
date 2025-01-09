import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar.component';
import {ProductService} from '../../core/services/product.service';
import {Product} from '../../shared/models/product.model';

@Component({
  selector: 'app-dashproducts',
  standalone: true,
  imports: [CommonModule, ProductModalComponent, AddProductModalComponent, SidebarComponent],
  template: `
    <div class="products-container">
      <app-sidebar (sidebarStateChange)="onSidebarStateChange($event)"></app-sidebar>

      <div class="main-content" [class.ml-64]="sidebarExpanded" [class.ml-20]="!sidebarExpanded">
        <div class="content-wrapper">
          <!-- Header -->
          <div class="content-header">
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">Products</h1>
              <p class="mt-1 text-sm text-gray-600">A list of all the products in your account.</p>
            </div>

            <!-- Add Model Button -->
            <button (click)="openAddProductModal()"
                    class="add-model-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Model
            </button>
          </div>

          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon total-products">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-label">Total Products</span>
                <span class="stat-value">{{totalProducts}}</span>
                <span class="stat-change positive">+{{monthlyGrowth}}% this month</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon members">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-label">Members</span>
                <span class="stat-value">{{activeMembers}}</span>
                <span class="stat-change negative">-1% this month</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-label">Active Now</span>
                <span class="stat-value">189</span>
                <div class="active-users">
                  <div class="user-avatars">
                    <img src="user/u1.png" alt="User 1" class="avatar">
                    <img src="user/u2.jpg" alt="User 2" class="avatar">
                    <img src="user/u3.jpg" alt="User 3" class="avatar">
                    <img src="user/u4.jpg" alt="User 4" class="avatar">
                    <img src="user/u2.jpg" alt="User 5" class="avatar">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Section -->
          <div class="products-section">
            <div class="section-header">
              <h2>My Products</h2>
              <div class="header-actions">
                <div class="search-field">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <input type="text" placeholder="Search">
                </div>
                <div class="sort-by">
                  <span>Sort by:</span>
                  <select>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Products Grid -->
            <div class="products-grid">
              <div *ngFor="let product of products" class="product-card" (click)="openProductModal(product)">
                <div class="product-image-container">
                  <img [src]="product.images[0]" [alt]="product.name" class="product-image">
                  <button class="remove-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{product.name}}</h3>
                  <div class="product-details">
                    <div class="detail">
                      <span class="label">Gender:</span>
                      <span class="value">{{product.gender}}</span>
                    </div>
                    <div class="detail">
                      <span class="label">Age:</span>
                      <span class="value">{{product.age}}</span>
                    </div>
                  </div>
                  <div class="product-price">
                    ₦{{product.price.toLocaleString()}}
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="pagination">
              <button class="pagination-btn" [disabled]="currentPage === 1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="pagination-pages">
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">4</button>
                <span>...</span>
                <button class="page-btn">28</button>
              </div>
              <button class="pagination-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Product Modal -->
      <app-product-modal
        *ngIf="isModalOpen"
        [product]="selectedProduct"
        (closeModal)="closeProductModal()"
        (saveProduct)="saveProduct($event)">
      </app-product-modal>

      <!-- Add Product Modal -->
      <app-add-product-modal
        [isVisible]="isAddModalOpen"
        (closeModal)="closeAddProductModal()"
        (saveProduct)="createProduct($event)">
      </app-add-product-modal>
    </div>
  `,
  styles: [`
    .products-container {
      @apply flex min-h-screen bg-gray-50;
    }

    .main-content {
      @apply flex-1 p-8 transition-all duration-300;
    }

    .main-content.sidebar-expanded {
      @apply ml-64;
    }

    .main-content.sidebar-collapsed {
      @apply ml-20;
    }

    .content-header {
      @apply flex justify-between items-center mb-6;
    }

    .add-model-btn {
      @apply flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700
             transition-all duration-300 transform hover:scale-105 hover:shadow-lg;
    }

    /* Header Styles */
    .header {
      @apply flex justify-between items-center mb-8;
    }

    .greeting {
      @apply text-2xl font-semibold;
    }

    .search-bar {
      @apply flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm;
    }

    .search-bar svg {
      @apply text-gray-400;
    }

    .search-bar input {
      @apply border-none outline-none bg-transparent;
    }

    /* Stats Grid */
    .stats-grid {
      @apply grid grid-cols-1 md:grid-cols-3 gap-6 mb-8;
    }

    .stat-card {
      @apply bg-white p-6 rounded-lg shadow-sm flex items-start gap-4;
    }

    .stat-icon {
      @apply p-3 rounded-lg;
    }

    .stat-icon.total-products {
      @apply bg-purple-50 text-purple-600;
    }

    .stat-icon.members {
      @apply bg-orange-50 text-orange-600;
    }

    .stat-icon.active {
      @apply bg-green-50 text-green-600;
    }

    .stat-info {
      @apply flex flex-col;
    }

    .stat-label {
      @apply text-sm text-gray-500;
    }

    .stat-value {
      @apply text-xl font-semibold mt-1;
    }

    .stat-change {
      @apply text-sm mt-1;
    }

    .stat-change.positive {
      @apply text-green-600;
    }

    .stat-change.negative {
      @apply text-red-600;
    }

    .active-users {
      @apply mt-2;
    }

    .user-avatars {
      @apply flex -space-x-2;
    }

    .avatar {
      @apply w-6 h-6 rounded-full border-2 border-white;
    }

    /* Products Section */
    .products-section {
      @apply bg-white rounded-lg shadow-sm p-6;
    }

    .section-header {
      @apply flex justify-between items-center mb-6;
    }

    .section-header h2 {
      @apply text-lg font-semibold;
    }

    .header-actions {
      @apply flex items-center gap-4;
    }

    .search-field {
      @apply flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg;
    }

    .search-field input {
      @apply border-none outline-none bg-transparent;
    }

    .sort-by {
      @apply flex items-center gap-2;
    }

    .sort-by select {
      @apply bg-transparent border-none outline-none text-gray-600;
    }

    /* Products Grid */
    .products-grid {
      @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6;
    }

    .product-card {
      @apply bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer transition-all duration-300;
      &:hover {
        @apply shadow-lg transform -translate-y-1;
        .product-details {
          @apply bg-purple-50;
        }
        .product-name {
          @apply text-purple-600;
        }
      }
    }

    .product-image-container {
      @apply relative aspect-square;
    }

    .product-image {
      @apply w-full h-full object-cover;
    }

    .remove-button {
      @apply absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 transition-colors duration-200;
    }

    .product-info {
      @apply p-4;
    }

    .product-name {
      @apply text-lg font-semibold mb-2;
    }

    .product-details {
      @apply space-y-1 mb-2;
    }

    .detail {
      @apply flex items-center text-sm;
    }

    .label {
      @apply text-gray-500 mr-2;
    }

    .value {
      @apply text-gray-700;
    }

    .product-price {
      @apply text-lg font-bold text-purple-600;
    }

    /* Pagination */
    .pagination {
      @apply flex justify-center items-center gap-2 mt-8;
    }

    .pagination-btn {
      @apply p-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed;
    }

    .pagination-pages {
      @apply flex items-center gap-1;
    }

    .page-btn {
      @apply px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-50;
    }

    .page-btn.active {
      @apply bg-purple-600 text-white hover:bg-purple-700;
    }
  `]
})
export class DashproductsComponent implements OnInit {
  sidebarExpanded = true;
  currentPage = 1;
  isModalOpen = false;
  isAddModalOpen = false;
  selectedProduct: Product = {
    id: 0,
    name: '',
    gender: '',
    age: '',
    category: '',
    description: '',
    price: 0,
    pricePerMeter: 0,
    duration: '',
    color: '',
    availability: true,
    meanEvaluation: 0,
    note: 0,
    images: [],
    stylist: {
      id: 0,
      name: '',
      image: ''
    },
    materials: []
  };
  products: Product[] = [];
  loading = true;
  error: string | null = null;
  totalProducts = 0;
  activeMembers = 0;
  monthlyGrowth = 0;

  constructor(private productsService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadStatistics();
  }

  loadProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading products';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  loadStatistics() {
    // In a real application, these would come from a statistics service
    this.productsService.getAllProducts().subscribe(products => {
      this.totalProducts = products.length;
      this.activeMembers = Math.floor(products.length * 0.35); // Simulated active members
      this.monthlyGrowth = 16; // Simulated growth
    });
  }

  onSidebarStateChange(expanded: boolean) {
    this.sidebarExpanded = expanded;
  }

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeProductModal() {
    this.selectedProduct = {
      id: 0,
      name: '',
      gender: '',
      age: '',
      category: '',
      description: '',
      price: 0,
      pricePerMeter: 0,
      duration: '',
      color: '',
      availability: true,
      meanEvaluation: 0,
      note: 0,
      images: [],
      stylist: {
        id: 0,
        name: '',
        image: ''
      },
      materials: []
    };
    this.isModalOpen = false;
  }

  openAddProductModal() {
    this.isAddModalOpen = true;
  }

  closeAddProductModal() {
    this.isAddModalOpen = false;
  }

  saveProduct(updatedProduct: Product) {
    // In a real application, this would call the service to update the product
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
    this.closeProductModal();
  }

  createProduct(newProduct: Product) {
    // In a real application, this would call the service to create the product
    this.products.push({
      ...newProduct,
      id: this.products.length + 1
    });
    this.closeAddProductModal();
  }
}
