import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
    message: string;
    type: 'success' | 'error';
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alertSubject = new BehaviorSubject<Alert | null>(null);
    alert$ = this.alertSubject.asObservable();

    showAlert(message: string, type: 'success' | 'error' = 'success') {
        this.alertSubject.next({ message, type });
        setTimeout(() => {
            this.alertSubject.next(null);
        }, 3000);
    }
}
