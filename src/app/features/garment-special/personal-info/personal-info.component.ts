import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Measure } from '../../garment/garment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-info-special',
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  
  @Input() measures! : Measure[];
  @Output() formSubmit = new EventEmitter<any>(); // Événement pour transmettre les données au parent

  formData = {
    gender: '',
    location: '',
    specification: '',
    deliveryType: '',
    selectedMeasureUserId: '', // Ajout de la mesure sélectionnée
  };

  onSubmit(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
    this.formSubmit.emit(this.formData); // Émet les données au parent
  }
  onMeasureChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Assure que target est un HTMLSelectElement
    const selectedValue = selectElement.value; // Récupère la valeur
    this.formData.selectedMeasureUserId = selectedValue; // Met à jour l'ID sélectionné
  }
  
  
}
