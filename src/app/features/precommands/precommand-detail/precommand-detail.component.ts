import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrecommandsService } from '../../../core/services/precommands.service';
import { Precommand, Measurements } from '../../../shared/models/precommand.model';

export interface PrecommandMaterial {
  name: string;
  pricePerMeter: number;
  quantity: number;
  totalPrice?: number;
}

@Component({
  selector: 'app-precommand-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8" *ngIf="precommand">
      <button (click)="goBack()" 
              class="mb-4 px-4 py-2 flex items-center text-gray-700 hover:text-gray-900 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Return to precommands
      </button>

      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Header with status -->
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-2xl font-bold">{{precommand.productName}}</h1>
              <p class="mt-1 text-indigo-100">By {{precommand.customerName}}</p>
            </div>
            <span [ngClass]="getStatusClass(precommand.status)">
              {{precommand.status | titlecase}}
            </span>
          </div>
        </div>

        <!-- Main content -->
        <div class="p-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 class="text-xl font-semibold mb-4">Product Details</h2>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-600">Category</p>
                  <p class="font-medium">{{precommand.category}}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Gender</p>
                  <p class="font-medium">{{precommand.gender | titlecase}}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Age Range</p>
                  <p class="font-medium">{{precommand.ageRange}}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Submitted On</p>
                  <p class="font-medium">{{formatDate(precommand.submittedAt)}}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-xl font-semibold mb-4">Pricing</h2>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-gray-600">Proposed Price</p>
                  <p class="font-medium">
                    <span class="text-gray-500">FCFA</span>
                    {{(precommand.proposedPrice !== undefined ? precommand.proposedPrice : 0) | number:'1.0-0'}}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Final Price</p>
                  <p class="font-medium">
                    <span class="text-gray-500">FCFA</span>
                    {{(precommand.finalPrice !== undefined ? precommand.finalPrice : 0) | number:'1.0-0'}}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Description and Specifications -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Description & Specifications</h2>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-600">Description</p>
                <p class="mt-1">{{precommand.description}}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Specifications</p>
                <p class="mt-1">{{precommand.specifications}}</p>
              </div>
            </div>
          </div>

          <!-- Materials Form -->
          <form [formGroup]="materialsForm" class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Materials Required</h2>
              <button type="button" 
                      (click)="addMaterial()"
                      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Add Material
              </button>
            </div>

            <div formArrayName="materials" class="space-y-4">
              <div *ngFor="let material of materialsArray.controls; let i = index" 
                   [formGroupName]="i"
                   class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Material Name</label>
                    <input formControlName="name" 
                           type="text" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Price per meter (FCFA)</label>
                    <input formControlName="pricePerMeter" 
                           type="number" 
                           (input)="updateTotalPrice()"
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Quantity (m²)</label>
                    <input formControlName="quantity" 
                           type="number" 
                           (input)="updateTotalPrice()"
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  </div>
                  <div class="flex items-end">
                    <button type="button" 
                            (click)="removeMaterial(i)"
                            class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      Remove
                    </button>
                  </div>
                </div>
                <div class="mt-2 text-right">
                  <p class="text-sm font-medium">Total: {{getMaterialTotal(i) | number:'1.0-0'}} FCFA</p>
                </div>
              </div>
            </div>
          </form>

          <!-- Workforce and Total Price -->
          <div class="mb-8 bg-gray-50 p-6 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Workforce Price (FCFA)</label>
                <input [(ngModel)]="workforcePrice" 
                       type="number" 
                       (input)="updateTotalPrice()"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              <div class="flex flex-col justify-end">
                <p class="text-lg font-medium">Total Materials: {{getTotalMaterialsPrice() | number:'1.0-0'}} FCFA</p>
                <p class="text-2xl font-bold text-indigo-600">Total Price: {{totalPrice | number:'1.0-0'}} FCFA</p>
              </div>
            </div>
          </div>

          <!-- Measurements -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Measurements</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Body Measurements -->
              <div>
                <h3 class="font-medium text-gray-900 mb-3">Body Measurements</h3>
                <div class="space-y-2">
                  <div>
                    <p class="text-sm text-gray-600">Stature</p>
                    <p class="font-medium">{{precommand.measurements.stature}} m</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Seated Height</p>
                    <p class="font-medium">{{precommand.measurements.seated_height}} cm</p>
                  </div>
                </div>
              </div>

              <!-- Upper Body -->
              <div>
                <h3 class="font-medium text-gray-900 mb-3">Upper Body</h3>
                <div class="space-y-2">
                  <div>
                    <p class="text-sm text-gray-600">Shoulder Circumference</p>
                    <p class="font-medium">{{precommand.measurements.shoulder_circumference}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Chest Circumference</p>
                    <p class="font-medium">{{precommand.measurements.chest_circumference}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Shoulder Length</p>
                    <p class="font-medium">{{precommand.measurements.shoulder_length}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Arm Length</p>
                    <p class="font-medium">{{precommand.measurements.arm_length}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Wrist Circumference</p>
                    <p class="font-medium">{{precommand.measurements.wrist_circumference}} cm</p>
                  </div>
                </div>
              </div>

              <!-- Lower Body -->
              <div>
                <h3 class="font-medium text-gray-900 mb-3">Lower Body</h3>
                <div class="space-y-2">
                  <div>
                    <p class="text-sm text-gray-600">Waist Circumference</p>
                    <p class="font-medium">{{precommand.measurements.waist_circumference}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Hip Circumference</p>
                    <p class="font-medium">{{precommand.measurements.hip_circumference}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Crotch Length</p>
                    <p class="font-medium">{{precommand.measurements.crotch_length}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Knee Height</p>
                    <p class="font-medium">{{precommand.measurements.knee_height}} cm</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Ankle Height</p>
                    <p class="font-medium">{{precommand.measurements.ankle_height}} cm</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 text-sm text-gray-600">
              Measurements taken on: {{formatDate(precommand.measurements.date_measure)}}
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4">
            <button type="button" 
                    (click)="rejectPrecommand()"
                    class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
              Send Back for Adjustment
            </button>
            <button type="button" 
                    (click)="confirmPrecommand()"
                    class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Confirm Pre-order
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PrecommandDetailComponent implements OnInit {
  precommand: Precommand | null = null;
  materialsForm: FormGroup;
  workforcePrice: number = 0;
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private precommandsService: PrecommandsService,
    private fb: FormBuilder
  ) {
    this.materialsForm = this.fb.group({
      materials: this.fb.array([])
    });
  }

  get materialsArray() {
    return this.materialsForm.get('materials') as FormArray;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.precommandsService.getPrecommandById(Number(id)).subscribe({
        next: (precommand) => {
          console.log('Loaded precommand:', precommand);
          this.precommand = precommand;
          this.initializeMaterials();
        },
        error: (error) => {
          console.error('Error loading precommand:', error);
        }
      });
    }
  }

  initializeMaterials() {
    if (this.precommand?.materials) {
      this.precommand.materials.forEach(material => {
        this.materialsArray.push(this.fb.group({
          name: [material],
          pricePerMeter: [0],
          quantity: [0]
        }));
      });
    }
  }

  addMaterial() {
    this.materialsArray.push(this.fb.group({
      name: [''],
      pricePerMeter: [0],
      quantity: [0]
    }));
  }

  removeMaterial(index: number) {
    this.materialsArray.removeAt(index);
    this.updateTotalPrice();
  }

  getMaterialTotal(index: number): number {
    const material = this.materialsArray.at(index).value;
    return material.pricePerMeter * material.quantity;
  }

  getTotalMaterialsPrice(): number {
    return this.materialsArray.controls.reduce((total, control) => {
      const material = control.value;
      return total + (material.pricePerMeter * material.quantity);
    }, 0);
  }

  updateTotalPrice() {
    const materialsTotal = this.getTotalMaterialsPrice();
    this.totalPrice = materialsTotal + this.workforcePrice;
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'reviewed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return baseClasses;
    }
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  confirmPrecommand() {
    if (this.totalPrice <= 0) {
      alert('Please specify material prices and workforce amount');
      return;
    }

    const confirmedPrecommand: Partial<Precommand> = {
      ...this.precommand,
      materials: this.materialsArray.value.map((m: PrecommandMaterial) => m.name),
      workforcePrice: this.workforcePrice,
      price: this.totalPrice,
      finalPrice: this.totalPrice,
      status: 'confirmed' as const
    };

    // Update the precommand
    if (this.precommand?.id) {
      this.precommandsService.updatePrecommand(this.precommand.id, confirmedPrecommand).subscribe({
        next: () => this.router.navigate(['/preOrders']),
        error: (error) => console.error('Error confirming precommand:', error)
      });
    }
  }

  rejectPrecommand() {
    if (this.precommand?.id) {
      const updatedPrecommand: Partial<Precommand> = {
        ...this.precommand,
        status: 'reviewed' as const
      };
      
      this.precommandsService.updatePrecommand(this.precommand.id, updatedPrecommand).subscribe({
        next: () => this.router.navigate(['/preOrders']),
        error: (error) => console.error('Error rejecting precommand:', error)
      });
    }
  }

  goBack() {
    this.router.navigate(['/preOrders']);
  }
}
