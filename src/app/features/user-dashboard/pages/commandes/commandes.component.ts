import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../../../shared/interfaces/order.interface';
import { OrderService } from '../../../../core/service/order.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
 selector: 'app-commandes',
 templateUrl: './commandes.component.html',
 imports: [CommonModule, NgxPaginationModule, FormsModule],
 standalone: true,
})
export class CommandesComponent implements OnInit {
 sortBy: 'recent' | 'oldest' | 'price-high' | 'price-low' = 'recent';
 orders: Order[] = [];
 page: number = 1;
 itemsPerPage: number = 12;
 totalItems: number = 0;
 selectedOrder: Order | null = null;
 isModalOpen: boolean = false; 
 currentPhotoIndex: number = 0;


 constructor(private orderService: OrderService) {}

 ngOnInit(): void {
   this.loadOrders();
 }

 loadOrders(): void {
   const id = 1;
   this.orderService.getUserOrders().subscribe({
     next: (orders) => {
       this.orders = orders;
       this.sortOrders();
       this.totalItems = this.orders.length;
     },
     error: (err) => console.error("Error loading orders:", err)
   });
 }

 sortOrders(): void {
   switch (this.sortBy) {
     case 'recent':
       this.orders.sort((a, b) => 
         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
       );
       break;
     case 'oldest':
       this.orders.sort((a, b) => 
         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
       );
       break;
     case 'price-low':
       this.orders.sort((a, b) => this.calculateTotal(b) - this.calculateTotal(a));
       break;
     case 'price-high':
       this.orders.sort((a, b) => this.calculateTotal(a) - this.calculateTotal(b));
       break;
   }
 }

 calculateTotal(order: Order): number {
   return order.payment.preOrder.utils.reduce(
     (sum, util) => sum + (util.price_per_square_meter * util.quantity), 0
   );
 }

 onSortChange(): void {
   this.sortOrders();
   this.page = 1;
 }

 openOrderDetailsModal(orderId: number): void {
  this.orderService.getOrderById(orderId).subscribe({
    next: (order) => {
      this.selectedOrder = order;
      this.isModalOpen = true; // Ouvre le modal
    },
    error: (err) =>
      console.error('Erreur lors du chargement de la commande:', err),
  });
}


closeOrderDetailsModal(): void {
  this.isModalOpen = false; // Ferme le modal
  this.selectedOrder = null; // Réinitialise la commande sélectionnée
}

// Fonction pour passer à la photo suivante
nextPhoto(): void {
  if (this.selectedOrder && this.selectedOrder.payment.preOrder.photos.length > 0) {
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.selectedOrder.payment.preOrder.photos.length;
  }
}

 // Fonction pour revenir à la photo précédente
 previousPhoto(): void {
  if (this.selectedOrder && this.selectedOrder.payment.preOrder.photos.length > 0) {
    this.currentPhotoIndex =
      (this.currentPhotoIndex - 1 + this.selectedOrder.payment.preOrder.photos.length) %
      this.selectedOrder.payment.preOrder.photos.length;
  }
}

 // Fonction pour définir une photo spécifique
 setCurrentPhoto(index: number): void {
  if (this.selectedOrder && index >= 0 && index < this.selectedOrder.payment.preOrder.photos.length) {
    this.currentPhotoIndex = index;
  }
}

// Méthode pour calculer le total matériel
calculateTotalMaterial(): number {
  if (this.selectedOrder) {
    return this.selectedOrder.payment.preOrder.utils.reduce(
      (total, util) => total + (util.price_per_square_meter * util.quantity),
      0
    );
  }
  return 0;
}

// Méthode pour calculer le prix total de la commande
calculateTotalOrder(): number {
  if (this.selectedOrder) {
    const totalMaterial = this.calculateTotalMaterial();
    const workforce = this.selectedOrder.payment.preOrder.workforce;
    return totalMaterial + workforce;
  }
  return 0;
}

}