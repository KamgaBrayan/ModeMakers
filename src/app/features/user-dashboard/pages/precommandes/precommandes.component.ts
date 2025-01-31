import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreOrder } from '../../../../shared/interfaces/preOrder.interface';
import { Component, OnInit } from '@angular/core';
import { PreOrderService } from '../../../../core/service/pre-order.service';

@Component({
  selector: 'app-precommandes',
  imports: [FormsModule, CommonModule],
  templateUrl: './precommandes.component.html',
  styleUrl: './precommandes.component.css'
})
export class PrecommandesComponent implements OnInit {
  sortBy: 'popular' | 'recent' = 'popular';
  preorders: PreOrder[] = [];
  selectedPreorder: PreOrder | null = null;

  constructor(private preorderService: PreOrderService) {}

  ngOnInit(): void {
    this.loadPreorders();
  }

  loadPreorders(): void {
    this.preorderService.getPreOrders().subscribe((preorders) => {
      this.preorders = preorders;
    });
  }

  openOrderDetailsModal(preorder: PreOrder) {
    this.selectedPreorder = preorder;
    document.getElementById('orderDetailsModal')?.classList.remove('hidden');
  }

  closeOrderDetailsModal() {
    this.selectedPreorder = null;
    document.getElementById('orderDetailsModal')?.classList.add('hidden');
  }

  cancelPreorder(id: number) {
    this.preorderService.cancelPreOrder(id).subscribe(() => {
      this.preorders = this.preorders.filter(p => p.id !== id);
    });
  }

  getStatusClass(status: string): string {
    return {
      'pending': 'bg-orange-100 text-orange-800',
      'confirmed': 'bg-green-100 text-green-800',
      'reviewed': 'bg-pink-100 text-pink-800'
    }[status] || 'bg-gray-100 text-gray-800';
  }
}
