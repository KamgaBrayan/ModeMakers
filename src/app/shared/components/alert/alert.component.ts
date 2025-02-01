import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import {Alert, AlertService} from "../../../core/service/alert.service";

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="alert$ | async as alert"
         class="fixed top-4 right-4 z-50 animate-slide-in"
         [@fadeInOut]>
      <div [class]="'rounded-lg p-4 ' +
           (alert.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                                     'bg-red-50 text-red-800 border border-red-200')">
        {{ alert.message }}
      </div>
    </div>
  `,
    styles: [`
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .animate-slide-in {
      animation: slideIn 0.3s ease-out;
    }
  `],
    animations: [
        // Vous pouvez ajouter des animations Angular ici si vous le souhaitez
    ]
})

export class AlertComponent implements OnInit {
    alert$: Observable<Alert | null> | null = null;

    constructor(private alertService: AlertService) {}

    ngOnInit() {
        this.alert$ = this.alertService.alert$;
    }
}
