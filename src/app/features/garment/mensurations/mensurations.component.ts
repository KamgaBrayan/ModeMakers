import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MeasureKey, Product } from '../garment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensurations',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mensurations.component.html',
  styleUrl: './mensurations.component.css'
})

export class MensurationsComponent {
  @Input() product!: Product; // Produit sélectionné passé en paramètre
  measureForm: FormGroup | null = null; // Formulaire pour les mesures

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.initializeForm();
    } 
  }

  // Initialisation dynamique du formulaire
  private initializeForm(): void {
    const formControls: { [key: string]: any } = {};
    if (this.product.requiredMeasures) {
      for (const measure of Object.keys(this.product.requiredMeasures) as MeasureKey[]) {
        formControls[measure] = [this.product.requiredMeasures[measure] || ''];
      }
    }
    this.measureForm = this.fb.group(formControls);
  }
  

  // Sauvegarder les mesures saisies
  saveMeasures(): void {
    if (this.measureForm && this.product) {
      this.product.requiredMeasures = this.measureForm.value;
      console.log('Updated product:', this.product);
      alert('Mesures sauvegardées avec succès!');
    }
  } 
}
 