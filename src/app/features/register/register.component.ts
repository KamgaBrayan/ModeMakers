import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    standalone: true,
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    userTypes = ['user', 'styliste'];

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
            userType: ['user', Validators.required]
        }, {
            validator: this.passwordMatchValidator
        });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : {'mismatch': true};
    }

    onSubmit() {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
            // Implement registration logic here
        }
    }
}
