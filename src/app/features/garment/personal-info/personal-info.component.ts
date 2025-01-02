import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  formData = {
    gender: '',
    location: '',
    commandDate: '',
    specification: ''
  };

  onSubmit() {
    console.log(this.formData); // Gérer les données du formulaire ici
  }
}
