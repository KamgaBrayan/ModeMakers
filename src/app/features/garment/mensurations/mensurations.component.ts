import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MeasureKey, Product } from '../garment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensurations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mensurations.component.html',
  styleUrls: ['./mensurations.component.css'],
})
export class MensurationsComponent implements OnInit {
  @Input() product!: Product; // Produit sélectionné passé en paramètre
  measureForm!: FormGroup; // Déclaration du formulaire
  requiredMeasureKeys: MeasureKey[] = []; // Liste des clés de mesures requises

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.measureForm = this.fb.group({});
    this.initializeForm();
    // this.requiredMeasureKeys = this.product.requiredMeasures ? Object.keys(this.product.requiredMeasures) : [];

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.initializeForm();
    }
  }

  // Initialisation dynamique du formulaire
  private initializeForm(): void {
    const formControls: { [key: string]: any } = {};
    this.requiredMeasureKeys = []; // Réinitialise les clés requises

    if (this.product.requiredMeasures) {
      for (const [measure, isRequired] of Object.entries(this.product.requiredMeasures)) {
        if (isRequired) {
          formControls[measure] = ['']; // Ajoute un champ vide
          this.requiredMeasureKeys.push(measure as MeasureKey); // Ajoute à la liste des champs requis
        }
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
