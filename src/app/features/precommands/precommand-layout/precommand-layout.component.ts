import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-precommand-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <app-sidebar (sidebarStateChange)="onSidebarStateChange($event)"></app-sidebar>

      <!-- Main Content -->
      <main [class.ml-64]="sidebarExpanded" [class.ml-20]="!sidebarExpanded" 
            class="flex-1 p-8 transition-all duration-300">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class PrecommandLayoutComponent {
  sidebarExpanded = true;

  onSidebarStateChange(expanded: boolean) {
    this.sidebarExpanded = expanded;
  }
}
