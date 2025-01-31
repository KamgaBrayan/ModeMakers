// mensurations.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup , FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface PersonalInfo {
  name: string;
  age: number;
  sex: string;
  weight: number;
}

interface MeasurementValues {
  stature: number;
  shoulder_circumference: number;
  chest_circumference: number;
  waist_circumference: number;
  hip_circumference: number;
  shoulder_height: number;
  hip_height: number;
  knee_height: number;
  chest_spacing: number;
  breast_height: number;
  pelvis_height: number;
  front_waist_length: number;
  shoulder_length: number;
  back_waist_length: number;
  arm_length: number;
  total_arm_length_bent: number;
  wrist_circumference: number;
  ankle_height: number;
  seated_height: number;
  crotch_length: number;
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
          (click)="addNewMeasurement()"
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
                <div>
                  <label class="block text-sm font-medium text-gray-700">Age</label>
                  <input type="number" formControlName="age"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Sexe</label>
                  <input type="text" formControlName="sex"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Poids (kg)</label>
                  <input type="number" formControlName="weight"
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
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
    </div>
  `
})
export class MensurationsComponent {
  measurementForm!: FormGroup;
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
        stature: 170,
        shoulder_circumference: 100,
        chest_circumference: 90,
        waist_circumference: 80,
        hip_circumference: 95,
        shoulder_height: 140,
        hip_height: 85,
        knee_height: 45,
        chest_spacing: 35,
        breast_height: 120,
        pelvis_height: 90,
        front_waist_length: 45,
        shoulder_length: 40,
        back_waist_length: 42,
        arm_length: 60,
        total_arm_length_bent: 65,
        wrist_circumference: 16,
        ankle_height: 10,
        seated_height: 85,
        crotch_length: 70
      }
    }
  ];

  selectedPerson: IMensuration | null = null;
  measurementFields: string[] = [
    'stature', 'shoulder_circumference', 'chest_circumference', 'waist_circumference',
    'hip_circumference', 'shoulder_height', 'hip_height', 'knee_height', 'chest_spacing',
    'breast_height', 'pelvis_height', 'front_waist_length', 'shoulder_length',
    'back_waist_length', 'arm_length', 'total_arm_length_bent', 'wrist_circumference',
    'ankle_height', 'seated_height', 'crotch_length'
  ];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm(): void {
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
  }

  selectPerson(person: IMensuration): void {
    this.selectedPerson = { ...person };
    this.measurementForm.patchValue({
      personalInfo: person.personalInfo,
      measurements: person.measurements
    });
  }

  addNewMeasurement(): void {
    const newPerson: IMensuration = {
      id: this.savedMeasurements.length + 1,
      personalInfo: {
        name: 'Nouvelle Personne',
        age: 25,
        sex: '',
        weight: 70
      },
      measurements: this.measurementFields.reduce((acc, field) => ({
        ...acc,
        [field]: 0
      }), {}) as MeasurementValues
    };
    this.savedMeasurements.push(newPerson);
    this.selectPerson(newPerson);
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

  formatLabel(field: string): string {
    return field.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}