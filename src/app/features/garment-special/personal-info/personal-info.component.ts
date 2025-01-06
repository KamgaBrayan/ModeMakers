import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-personal-info-special',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  
  @Output() formSubmit = new EventEmitter<any>(); // Événement pour transmettre les données au parent

  formData = {
    gender: '',
    location: '',
    specification: '',
    deliveryType: ''
  };

  onSubmit(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
    this.formSubmit.emit(this.formData); // Émet les données au parent
  }
}
