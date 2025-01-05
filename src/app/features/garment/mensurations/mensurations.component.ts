import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MeasureKey } from '../garment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensurations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mensurations.component.html',
  styleUrls: ['./mensurations.component.css'],
})
export class MensurationsComponent implements OnInit {
  
  measureForm!: FormGroup; // Déclaration du formulaire
  MeasureKey: string[] = MeasureKey;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.measureForm = this.fb.group({});
    this.initializeForm();
  }



  // Initialisation dynamique du formulaire
  private initializeForm(): void {
    const formControls: { [key: string]: any } = {};
    this.MeasureKey.forEach(key => {
      formControls[key] = [''];
    })

    this.measureForm = this.fb.group(formControls);
  }

  // Sauvegarder les mesures saisies
  saveMeasures(): void {
    if (this.measureForm) {
      console.log('Updated product:');
      alert('Mesures sauvegardées avec succès!');
    }
  }
}
