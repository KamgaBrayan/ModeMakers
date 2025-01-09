import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeasurementService, Measurement } from '../../../../core/services/measurement.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mensurations',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="measurements-container">
      <mat-tab-group class="measurement-tabs">
        <mat-tab label="My Measurements">
          <div class="measurements-content">
            <div class="header-actions">
              <h1>My Measurements</h1>
              <button mat-raised-button color="primary" (click)="showForm = true" *ngIf="!showForm">
                <mat-icon>add</mat-icon>
                New Measurement
              </button>
            </div>

            <!-- Measurement Form -->
            <mat-card *ngIf="showForm" class="measurement-form-card">
              <mat-card-header>
                <mat-card-title>{{ editingMeasurement ? 'Edit' : 'New' }} Measurement</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="measurementForm" (ngSubmit)="onSubmit()" class="measurement-form">
                  <div class="form-row">
                    <mat-form-field appearance="outline">
                      <mat-label>Title</mat-label>
                      <input matInput formControlName="title" placeholder="e.g., My Summer Measurements">
                    </mat-form-field>
                  </div>

                  <div class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Stature (m)</mat-label>
                      <input matInput type="number" formControlName="stature" step="0.01">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Shoulder Circumference (cm)</mat-label>
                      <input matInput type="number" formControlName="shoulder_circumference" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Chest Circumference (cm)</mat-label>
                      <input matInput type="number" formControlName="chest_circumference" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Waist Circumference (cm)</mat-label>
                      <input matInput type="number" formControlName="waist_circumference" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Hip Circumference (cm)</mat-label>
                      <input matInput type="number" formControlName="hip_circumference" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Shoulder Height (cm)</mat-label>
                      <input matInput type="number" formControlName="shoulder_height" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Hip Height (cm)</mat-label>
                      <input matInput type="number" formControlName="hip_height" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Knee Height (cm)</mat-label>
                      <input matInput type="number" formControlName="knee_height" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Chest Spacing (cm)</mat-label>
                      <input matInput type="number" formControlName="chest_spacing" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Breast Height (cm)</mat-label>
                      <input matInput type="number" formControlName="breast_height" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Pelvis Height (cm)</mat-label>
                      <input matInput type="number" formControlName="pelvis_height" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Front Waist Length (cm)</mat-label>
                      <input matInput type="number" formControlName="front_waist_length" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Shoulder Length (cm)</mat-label>
                      <input matInput type="number" formControlName="shoulder_length" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Back Waist Length (cm)</mat-label>
                      <input matInput type="number" formControlName="back_waist_length" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Arm Length (cm)</mat-label>
                      <input matInput type="number" formControlName="arm_length" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Total Arm Length Bent (cm)</mat-label>
                      <input matInput type="number" formControlName="total_arm_length_bent" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Wrist Circumference (cm)</mat-label>
                      <input matInput type="number" formControlName="wrist_circumference" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Ankle Height (cm)</mat-label>
                      <input matInput type="number" formControlName="ankle_height" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Seated Height (cm)</mat-label>
                      <input matInput type="number" formControlName="seated_height" step="0.1">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Crotch Length (cm)</mat-label>
                      <input matInput type="number" formControlName="crotch_length" step="0.1">
                    </mat-form-field>
                  </div>

                  <div class="form-actions">
                    <button mat-button type="button" (click)="cancelForm()">Cancel</button>
                    <button mat-raised-button color="primary" type="submit">
                      {{ editingMeasurement ? 'Update' : 'Save' }}
                    </button>
                  </div>
                </form>
              </mat-card-content>
            </mat-card>

            <!-- Measurements List -->
            <div class="measurements-grid">
              <mat-card *ngFor="let measurement of measurements" class="measurement-card">
                <mat-card-header>
                  <mat-card-title>{{measurement.title}}</mat-card-title>
                  <mat-card-subtitle>{{measurement.date_measure | date}}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="measurement-details">
                    <div class="detail-item">
                      <span>Stature</span>
                      <span>{{measurement.stature}}m</span>
                    </div>
                    <div class="detail-item">
                      <span>Chest</span>
                      <span>{{measurement.chest_circumference}}cm</span>
                    </div>
                    <div class="detail-item">
                      <span>Waist</span>
                      <span>{{measurement.waist_circumference}}cm</span>
                    </div>
                    <div class="detail-item">
                      <span>Hip</span>
                      <span>{{measurement.hip_circumference}}cm</span>
                    </div>
                  </div>
                </mat-card-content>
                <mat-card-actions align="end">
                  <button mat-icon-button color="primary" (click)="editMeasurement(measurement)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteMeasurement(measurement.id)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
            <div *ngIf="isLoading" class="loading-overlay">
              <mat-progress-spinner diameter="24"></mat-progress-spinner>
            </div>
            <div *ngIf="error" class="error-message">
              {{ error }}
            </div>
          </div>
        </mat-tab>

        <mat-tab label="AI Measurement">
          <div class="ai-measurement-content">
            <mat-card class="ai-upload-card">
              <mat-card-header>
                <mat-card-title>Get Measurements from Photo</mat-card-title>
                <mat-card-subtitle>Upload a full-body photo to get your measurements using AI</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="upload-area" 
                     (dragover)="onDragOver($event)" 
                     (drop)="onDrop($event)"
                     [class.dragover]="isDragging">
                  <mat-icon>cloud_upload</mat-icon>
                  <p>Drag and drop your photo here or</p>
                  <button mat-raised-button color="primary" (click)="fileInput.click()">
                    Choose File
                  </button>
                  <input #fileInput type="file" (change)="onFileSelected($event)" hidden accept="image/*">
                </div>
                <div *ngIf="selectedImage" class="preview-area">
                  <img [src]="selectedImage" alt="Preview">
                  <button mat-raised-button color="primary" (click)="processImage()">
                    Get Measurements
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .measurements-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header-actions h1 {
      font-size: 2rem;
      font-weight: 500;
      margin: 0;
    }

    .measurement-form-card {
      margin-bottom: 2rem;
    }

    .measurement-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }

    .measurements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .measurement-card {
      transition: transform 0.2s;
    }

    .measurement-card:hover {
      transform: translateY(-4px);
    }

    .measurement-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      background-color: rgba(0, 0, 0, 0.03);
      border-radius: 4px;
    }

    .ai-measurement-content {
      padding: 2rem;
    }

    .ai-upload-card {
      max-width: 600px;
      margin: 0 auto;
    }

    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      margin: 2rem 0;
      transition: all 0.3s;
    }

    .upload-area.dragover {
      border-color: primary;
      background-color: rgba(0, 0, 0, 0.03);
    }

    .upload-area mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      color: #666;
    }

    .preview-area {
      text-align: center;
    }

    .preview-area img {
      max-width: 100%;
      max-height: 400px;
      margin-bottom: 1rem;
      border-radius: 8px;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .error-message {
      color: red;
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 1rem;
    }
  `]
})
export class MensurationsComponent implements OnInit {
  measurementForm!: FormGroup;
  measurements: Measurement[] = [];
  showForm = false;
  editingMeasurement: Measurement | null = null;
  selectedImage: string | null = null;
  isDragging = false;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private measurementService: MeasurementService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.measurementForm = this.fb.group({
      title: ['', Validators.required],
      stature: ['', [Validators.required, Validators.min(0)]],
      shoulder_circumference: ['', [Validators.required, Validators.min(0)]],
      chest_circumference: ['', [Validators.required, Validators.min(0)]],
      waist_circumference: ['', [Validators.required, Validators.min(0)]],
      hip_circumference: ['', [Validators.required, Validators.min(0)]],
      shoulder_height: ['', [Validators.required, Validators.min(0)]],
      hip_height: ['', [Validators.required, Validators.min(0)]],
      knee_height: ['', [Validators.required, Validators.min(0)]],
      chest_spacing: ['', [Validators.required, Validators.min(0)]],
      breast_height: ['', [Validators.required, Validators.min(0)]],
      pelvis_height: ['', [Validators.required, Validators.min(0)]],
      front_waist_length: ['', [Validators.required, Validators.min(0)]],
      shoulder_length: ['', [Validators.required, Validators.min(0)]],
      back_waist_length: ['', [Validators.required, Validators.min(0)]],
      arm_length: ['', [Validators.required, Validators.min(0)]],
      total_arm_length_bent: ['', [Validators.required, Validators.min(0)]],
      wrist_circumference: ['', [Validators.required, Validators.min(0)]],
      ankle_height: ['', [Validators.required, Validators.min(0)]],
      seated_height: ['', [Validators.required, Validators.min(0)]],
      crotch_length: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.loadMeasurements();
  }

  loadMeasurements() {
    this.isLoading = true;
    this.error = null;
    // Hardcoded user ID for now - in a real app this would come from an auth service
    const userId = 1;
    
    this.measurementService.getMeasurementsByUserId(userId).subscribe({
      next: (measurements) => {
        this.measurements = measurements;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading measurements:', error);
        this.error = 'Failed to load measurements. Please try again later.';
        this.isLoading = false;
        this.snackBar.open(this.error, 'Close', { duration: 5000 });
      }
    });
  }

  onSubmit() {
    if (this.measurementForm.valid) {
      const formValue = this.measurementForm.value;
      const measurement = {
        ...formValue,
        user: {
          user_id: 1, // Hardcoded for now
          user_name: 'John Doe', // Hardcoded for now
          roles: ['user']
        },
        date_measure: new Date().toISOString()
      };

      if (this.editingMeasurement) {
        this.measurementService.updateMeasurement(this.editingMeasurement.id, measurement).subscribe({
          next: (updatedMeasurement) => {
            const index = this.measurements.findIndex(m => m.id === updatedMeasurement.id);
            if (index !== -1) {
              this.measurements[index] = updatedMeasurement;
            }
            this.snackBar.open('Measurement updated successfully!', 'Close', { duration: 3000 });
            this.cancelForm();
          },
          error: (error) => {
            console.error('Error updating measurement:', error);
            this.snackBar.open('Failed to update measurement. Please try again.', 'Close', { duration: 5000 });
          }
        });
      } else {
        this.measurementService.createMeasurement(measurement).subscribe({
          next: (newMeasurement) => {
            this.measurements.push(newMeasurement);
            this.snackBar.open('Measurement added successfully!', 'Close', { duration: 3000 });
            this.cancelForm();
          },
          error: (error) => {
            console.error('Error creating measurement:', error);
            this.snackBar.open('Failed to create measurement. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 5000 });
    }
  }

  editMeasurement(measurement: Measurement) {
    this.editingMeasurement = measurement;
    this.measurementForm.patchValue(measurement);
    this.showForm = true;
  }

  deleteMeasurement(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Measurement',
        message: 'Are you sure you want to delete this measurement?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.measurementService.deleteMeasurement(id).subscribe({
          next: () => {
            this.measurements = this.measurements.filter(m => m.id !== id);
            this.snackBar.open('Measurement deleted successfully!', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error deleting measurement:', error);
            this.snackBar.open('Failed to delete measurement. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  cancelForm() {
    this.showForm = false;
    this.editingMeasurement = null;
    this.measurementForm.reset();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      this.snackBar.open('Please select an image file.', 'Close', { duration: 3000 });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.selectedImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  processImage() {
    if (!this.selectedImage) {
      this.snackBar.open('Please select an image first.', 'Close', { duration: 3000 });
      return;
    }
    // TODO: Implement AI measurement processing
    this.snackBar.open('AI measurement processing coming soon!', 'Close', { duration: 3000 });
  }
}
