import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PersonalInfo {
  name: string;
  age: number;
  sex: string;
  weight: number;
}

interface MeasurementValues {
  shoulder_length: number;
  head_circumference: number;
  arm_length: number;
  chest_circumference: number;
  underbust_circumference: number;
  waist_circumference: number;
  iliac_crest_circumference: number;
  hip_circumference: number;
  thigh_circumference: number;
  knee_circumference: number;
  calf_circumference: number;
  ankle_circumference: number;
  biceps_circumference: number;
  elbow_circumference: number;
  forearm_circumference: number;
  wrist_circumference: number;
  wrist_to_elbow_length: number;
  knee_to_ankle_length: number;
  inseam_length: number;
  outseam_length: number;
  total_height: number;
  front_body_length: number;
  back_body_length: number;
}

interface IMensuration {
  id: number;
  personalInfo: PersonalInfo;
  measurements: MeasurementValues;
}

@Component({
  selector: 'app-mensurations',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Mes Mensurations</h1>
        <button 
          (click)="openAddMeasurementModal()"
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span>Add a New Measurement</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </button>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Side - Saved Measurements -->
        <div class="bg-gray-100 p-4 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">Mensurations enregistrées</h2>
          <div class="space-y-2">
            <div *ngFor="let person of savedMeasurements" 
                 (click)="selectPerson(person)"
                 [class.bg-indigo-50]="selectedPerson?.id === person.id"
                 class="flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
              <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <span>{{person.personalInfo.name}}</span>
            </div>
          </div>
        </div>

        <!-- Right Side - Measurement Form -->
        <div class="bg-white p-4 rounded-lg" *ngIf="selectedPerson">
          <form [formGroup]="measurementForm" class="space-y-6">
            <!-- Personal Information Section -->
            <div class="border-b pb-4">
              <h3 class="text-lg font-semibold mb-4">Informations Personnelles</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4" formGroupName="personalInfo">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nom</label>
                  <input type="text" formControlName="name" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <!-- Other personal info inputs -->
              </div>
            </div>

            <!-- Measurements Section -->
            <div formGroupName="measurements">
              <h3 class="text-lg font-semibold mb-4">Mensurations</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div *ngFor="let field of measurementFields">
                  <label class="block text-sm font-medium text-gray-700">
                    {{formatLabel(field)}}
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input type="number" [formControlName]="field"
                           class="block w-full rounded-md border-gray-300 shadow-sm">
                    <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      cm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end">
              <button 
                (click)="saveMeasurements()"
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Add Measurement Modal -->
      <div *ngIf="isAddMeasurementModalOpen" 
           class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
        <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Add New Measurement</h2>
            <button 
              (click)="closeAddMeasurementModal()"
              class="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <!-- Toggle for Measurement Method -->
          <div class="mb-4 flex justify-center">
            <div class="bg-gray-100 rounded-full p-1 flex">
              <button 
                (click)="measurementMethod = 'manual'"
                [class]="measurementMethod === 'manual' ? 'bg-indigo-600 text-white' : 'text-gray-600'"
                class="px-4 py-2 rounded-full transition-colors">
                Manual Input
              </button>
              <button 
                (click)="measurementMethod = 'ai'"
                [class]="measurementMethod === 'ai' ? 'bg-indigo-600 text-white' : 'text-gray-600'"
                class="px-4 py-2 rounded-full transition-colors">
                AI Measurement
              </button>
            </div>
          </div>

          <!-- Measurement Input Container -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Side: Manual Input OR File Drop -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <ng-container *ngIf="measurementMethod === 'manual'">
                <form [formGroup]="addMeasurementForm" class="space-y-6">
                  <!-- Personal Information Section -->
                  <div class="border-b pb-4">
                    <h3 class="text-lg font-semibold mb-4">Personal Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" formGroupName="personalInfo">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" formControlName="name" 
                               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                      </div>
                      <!-- Other personal info inputs -->
                    </div>
                  </div>

                  <!-- Measurements Section -->
                  <div formGroupName="measurements">
                    <h3 class="text-lg font-semibold mb-4">Measurements</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div *ngFor="let field of measurementFields">
                        <label class="block text-sm font-medium text-gray-700">
                          {{formatLabel(field)}}
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <input type="number" [formControlName]="field"
                                 class="block w-full rounded-md border-gray-300 shadow-sm">
                          <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                            cm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </ng-container>

              <!-- AI Measurement File Drop -->
              <ng-container *ngIf="measurementMethod === 'ai'">
                <div class="border-2 border-dashed border-gray-300 p-6 text-center">
                  <input 
                    type="file" 
                    #fileInput 
                    (change)="onFileDropped($event)"
                    accept="image/*" 
                    class="hidden"
                  >
                  <button 
                    (click)="fileInput.click()"
                    class="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg">
                    Drop Image or Click to Upload
                  </button>
                  <p class="mt-2 text-gray-500">Supports JPG, PNG, WEBP</p>
                </div>
              </ng-container>
            </div>

            <!-- Right Side: Measurement Guide / AI Results -->
            <div class="bg-white p-4 rounded-lg">
              <ng-container *ngIf="measurementMethod === 'manual'">
                <h3 class="text-lg font-semibold mb-4">Measurement Guide</h3>
                <img 
                  src="assets/images/mensuration_image.jpg" 
                  alt="Measurement Guide" 
                  class="w-full rounded-lg mb-4"
                />
                <ul class="space-y-2 text-sm text-gray-600">
                  <li>• Wear tight-fitting clothes</li>
                  <li>• Stand straight with feet together</li>
                  <li>• Keep measuring tape parallel to ground</li>
                  <li>• Breathe normally during measurements</li>
                </ul>
              </ng-container>

              <ng-container *ngIf="measurementMethod === 'ai'">
                <h3 class="text-lg font-semibold mb-4">AI Measurement Results</h3>
                <div *ngIf="aiMeasurementResults" class="space-y-2">
                  <div *ngFor="let measurement of aiMeasurementResults | keyvalue">
                    <label class="block text-sm font-medium text-gray-700">
                      {{formatLabel(measurement.key)}}
                    </label>
                    <input 
                      type="number" 
                      [value]="measurement.value" 
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      readonly
                    >
                  </div>
                </div>
                <p *ngIf="!aiMeasurementResults" class="text-gray-500 text-center">
                  Upload an image to get AI measurements
                </p>
              </ng-container>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="mt-6 flex justify-end space-x-4">
            <button 
              (click)="closeAddMeasurementModal()"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
              Cancel
            </button>
            <button 
              (click)="saveNewMeasurement()"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              Save Measurement
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MensurationsComponent {
  measurementForm!: FormGroup;
  addMeasurementForm!: FormGroup;
  savedMeasurements: IMensuration[] = [
    {
      id: 1,
      personalInfo: {
        name: 'Moi (default)',
        age: 25,
        sex: 'M',
        weight: 70
      },
      measurements: {
        shoulder_length: 40,
        head_circumference: 56,
        arm_length: 60,
        chest_circumference: 90,
        underbust_circumference: 85,
        waist_circumference: 80,
        iliac_crest_circumference: 88,
        hip_circumference: 95,
        thigh_circumference: 55,
        knee_circumference: 38,
        calf_circumference: 36,
        ankle_circumference: 22,
        biceps_circumference: 32,
        elbow_circumference: 28,
        forearm_circumference: 26,
        wrist_circumference: 16,
        wrist_to_elbow_length: 25,
        knee_to_ankle_length: 40,
        inseam_length: 76,
        outseam_length: 100,
        total_height: 170,
        front_body_length: 70,
        back_body_length: 68
      }
    }
  ];

  selectedPerson: IMensuration | null = null;
  measurementFields: string[] = [
    'shoulder_length', 'head_circumference', 'arm_length', 
    'chest_circumference', 'underbust_circumference', 'waist_circumference', 
    'iliac_crest_circumference', 'hip_circumference', 'thigh_circumference', 
    'knee_circumference', 'calf_circumference', 'ankle_circumference', 
    'biceps_circumference', 'elbow_circumference', 'forearm_circumference', 
    'wrist_circumference', 'wrist_to_elbow_length', 'knee_to_ankle_length', 
    'inseam_length', 'outseam_length', 'total_height', 
    'front_body_length', 'back_body_length'
  ];

  // New properties for modal
  isAddMeasurementModalOpen = false;
  measurementMethod: 'manual' | 'ai' = 'manual';
  aiMeasurementResults: MeasurementValues | null = null;

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  initForms(): void {
    this.measurementForm = this.fb.group({
      personalInfo: this.fb.group({
        name: [''],
        age: [null],
        sex: [''],
        weight: [null]
      }),
      measurements: this.fb.group(
        this.measurementFields.reduce((acc, field) => ({
          ...acc,
          [field]: [null]
        }), {})
      )
    });
    this.addMeasurementForm = this.fb.group({
      personalInfo: this.fb.group({
        name: [''],
        age: [null],
        sex: [''],
        weight: [null]
      }),
      measurements: this.fb.group(
        this.measurementFields.reduce((acc, field) => ({
          ...acc,
          [field]: [null]
        }), {})
      )
    });
  }

  selectPerson(person: IMensuration): void {
    this.selectedPerson = { ...person };
    this.measurementForm.patchValue({
      personalInfo: person.personalInfo,
      measurements: person.measurements
    });
  }

  formatLabel(field: string): string {
    return field.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  saveMeasurements(): void {
    if (this.selectedPerson && this.measurementForm.valid) {
      const updatedMeasurement = {
        ...this.selectedPerson,
        personalInfo: this.measurementForm.value.personalInfo,
        measurements: this.measurementForm.value.measurements
      };
      const index = this.savedMeasurements.findIndex(m => m.id === this.selectedPerson?.id);
      if (index !== -1) {
        this.savedMeasurements[index] = updatedMeasurement;
      }
    }
  }

  openAddMeasurementModal(): void {
    this.isAddMeasurementModalOpen = true;
    this.measurementMethod = 'manual';
    this.aiMeasurementResults = null;
    this.addMeasurementForm.reset();
  }

  closeAddMeasurementModal(): void {
    this.isAddMeasurementModalOpen = false;
  }

  onFileDropped(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Simulate AI measurement API call
      this.aiMeasurementResults = {
        shoulder_length: 40,
        head_circumference: 56,
        arm_length: 60,
        chest_circumference: 90,
        underbust_circumference: 85,
        waist_circumference: 80,
        iliac_crest_circumference: 88,
        hip_circumference: 95,
        thigh_circumference: 55,
        knee_circumference: 38,
        calf_circumference: 36,
        ankle_circumference: 22,
        biceps_circumference: 32,
        elbow_circumference: 28,
        forearm_circumference: 26,
        wrist_circumference: 16,
        wrist_to_elbow_length: 25,
        knee_to_ankle_length: 40,
        inseam_length: 76,
        outseam_length: 100,
        total_height: 170,
        front_body_length: 70,
        back_body_length: 68
      };
    }
  }

  saveNewMeasurement(): void {
    const formValues = this.measurementMethod === 'manual' 
      ? this.addMeasurementForm.value 
      : { 
          personalInfo: {
            name: 'AI Measurement',
            age: null,
            sex: '',
            weight: null
          },
          measurements: this.aiMeasurementResults 
        };

    const newPerson: IMensuration = {
      id: this.savedMeasurements.length + 1,
      personalInfo: formValues.personalInfo,
      measurements: formValues.measurements
    };

    this.savedMeasurements.push(newPerson);
    this.selectPerson(newPerson);
    this.closeAddMeasurementModal();
  }
}