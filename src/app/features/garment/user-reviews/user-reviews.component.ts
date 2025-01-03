import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserReview } from '../garment.model';

@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css'],
})
export class UserReviewsComponent {
  reviewForm: FormGroup; // Formulaire pour une nouvelle review
  reviews: UserReview[] = []; // Liste des reviews

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      const newReview: UserReview = {
        ...this.reviewForm.value,
        date: new Date(), // Ajoute automatiquement la date
      };
      this.reviews.push(newReview);
      this.reviewForm.reset(); // Réinitialise le formulaire après soumission
    }
  }
}
