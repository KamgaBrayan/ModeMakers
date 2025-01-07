import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.signupForm.valid) {
      const email = this.signupForm.get('email')?.value;
      console.log('Email inscrit:', email);
      alert('Email enregistré avec succès!');
    }
  }
}
