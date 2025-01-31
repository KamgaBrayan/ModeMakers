// measurement-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-measurement-dialog',
  template: `
    <div class="p-6 max-w-4xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Add New Measurements</h2>
        <button mat-icon-button (click)="dialogRef.close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Input Method Toggle -->
      <mat-slide-toggle
        [(ngModel)]="useAI"
        class="mb-6">
        {{ useAI ? 'AI-Powered Measurement' : 'Manual Entry' }}
      </mat-slide-toggle>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Side -->
        <div [ngSwitch]="useAI">
          <!-- Manual Entry Guide -->
          <div *ngSwitchCase="false" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-4">Measurement Guide</h3>
            <img 
              src="/assets/measurement-guide.svg" 
              alt="Measurement Guide" 
              class="w-full h-auto"
            />
            <div class="mt-4 text-sm text-gray-600">
              <p>Follow these guidelines for accurate measurements:</p>
              <ul class="list-disc pl-4 mt-2">
                <li>Use a flexible measuring tape</li>
                <li>Measure on bare skin or light clothing</li>
                <li>Keep the tape parallel to the ground</li>
                <li>Don't pull the tape too tight</li>
              </ul>
            </div>
          </div>

          <!-- AI Upload Area -->
          <div *ngSwitchCase="true" class="bg-gray-50 p-4 rounded-lg">
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
              [class.border-indigo-500]="isDragging"
              (dragover)="onDragOver($event)"
              (dragleave)="isDragging = false"
              (drop)="onDrop($event)">
              
              <div class="space-y-4">
                <mat-icon class="text-4xl text-gray-400">cloud_upload</mat-icon>
                <h3 class="text-lg font-medium">Drop your image here</h3>
                <p class="text-sm text-gray-500">
                  or <button mat-button color="primary" (click)="fileInput.click()">browse files</button>
                </p>
                <input
                  #fileInput
                  type="file"
                  class="hidden"
                  accept="image/*"
                  (change)="onFileSelected($event)"
                />
              </div>

              <div *ngIf="selectedFile" class="mt-4">
                <p class="text-sm text-gray-600">Selected: {{ selectedFile.name }}</p>
                <mat-progress-bar
                  *ngIf="isProcessing"
                  mode="indeterminate"
                  class="mt-2">
                </mat-progress-bar>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Form -->
        <form [formGroup]="measurementForm" class="space-y-6">
          <!-- Personal Information -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Personal Information</mat-card-title>
            </mat-card-header>
            <mat-card-content class="grid grid-cols-2 gap-4 mt-4" formGroupName="personalInfo">
              <mat-form-field>
                <mat-label>Name</mat-label>
                <input matInput formControlName="name">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Age</mat-label>
                <input matInput type="number" formControlName="age">
              </mat-form-field>

              <mat-form-field>
                <mat-label>Sex</mat-label>
                <mat-select formControlName="sex">
                  <mat-option value="M">Male</mat-option>
                  <mat-option value="F">Female</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Weight (kg)</mat-label>
                <input matInput type="number" formControlName="weight">
              </mat-form-field>
            </mat-card-content>
          </mat-card>

          <!-- Measurements -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Measurements</mat-card-title>
            </mat-card-header>
            <mat-card-content class="grid grid-cols-2 gap-4 mt-4" formGroupName="measurements">
              <mat-form-field *ngFor="let field of measurementFields">
                <mat-label>{{ formatLabel(field) }}</mat-label>
                <input matInput type="number" [formControlName]="field">
                <span matSuffix>cm</span>
              </mat-form-field>
            </mat-card-content>
          </mat-card>

          <!-- Actions -->
          <div class="flex justify-end gap-4">
            <button mat-button (click)="dialogRef.close()">Cancel</button>
            <button 
              mat-raised-button 
              color="primary"
              [disabled]="!measurementForm.valid || isProcessing"
              (click)="save()">
              Save Measurements
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class MeasurementDialogComponent {
  useAI = false;
  isDragging = false;
  isProcessing = false;
  selectedFile: File | null = null;
  measurementForm: FormGroup;
  measurementFields: string[];

  constructor(
    public dialogRef: MatDialogRef<MeasurementDialogComponent>,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  private initForm(): void {
    // ... Same form initialization as before
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      // Show error message
      return;
    }

    this.selectedFile = file;
    this.isProcessing = true;

    // Simulate API call
    setTimeout(() => {
      // Mock response
      const mockMeasurements = {
        stature: 175,
        shoulder_circumference: 105,
        // ... other measurements
      };

      this.measurementForm.patchValue({
        measurements: mockMeasurements
      });
      this.isProcessing = false;
    }, 2000);
  }

  save(): void {
    if (this.measurementForm.valid) {
      this.dialogRef.close(this.measurementForm.value);
    }
  }

  formatLabel(field: string): string {
    return field.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}