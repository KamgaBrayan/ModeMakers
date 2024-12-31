import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Measurement {
  id: number;
  name: string;
  height: number;
  weight: number;
  age: number;
  sex: string;
  preferences: string;
}

@Component({
  selector: 'app-mensurations',
  templateUrl: './mensurations.component.html',
  imports: [
   NgFor // Import any necessary modules or components
  ]
})
export class MensurationsComponent {
  measurementForm: FormGroup;
  savedProfiles: Measurement[] = [
    { id: 1, name: 'Moi (default)', height: 170, weight: 72, age: 25, sex: 'M', preferences: 'Casual' },
    { id: 2, name: 'Person 1', height: 165, weight: 65, age: 30, sex: 'F', preferences: 'Formal' },
  ];

  constructor(private fb: FormBuilder) {
    this.measurementForm = this.fb.group({
      name: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      age: ['', [Validators.required, Validators.min(0)]],
      sex: ['', Validators.required],
      preferences: ['']
    });
  }

  onSubmit() {
    if (this.measurementForm.valid) {
      const newProfile = {
        id: this.savedProfiles.length + 1,
        ...this.measurementForm.value
      };
      this.savedProfiles.push(newProfile);
      this.measurementForm.reset();
    }
  }
}
