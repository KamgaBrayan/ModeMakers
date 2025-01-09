import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="h-screen fixed left-0 top-0 z-40 transition-all duration-300"
         [class.w-64]="isExpanded"
         [class.w-20]="!isExpanded">
      <div class="h-full px-3 py-4 bg-white border-r relative">
        <!-- Toggle Button -->
        <button
          (click)="toggleSidebar()"
          class="absolute -right-3 top-10 bg-[#3734A9] text-white p-1 rounded-full shadow-lg hover:bg-[#2d2a87] transition-all duration-300">
          <svg [class.rotate-180]="!isExpanded" class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex items-center mb-8" [class.justify-center]="!isExpanded">
          <img src="assets/p1.jpg" class="w-10 h-10 rounded-lg" alt="Logo">
          <span class="ml-3 text-xl font-bold text-[#3734A9] transition-opacity duration-300"
                [class.opacity-0]="!isExpanded"
                [class.hidden]="!isExpanded">
            ModeMakers
          </span>
        </div>

        <!-- Navigation -->
        <nav class="space-y-1">
          <ng-container *ngFor="let item of navItems">
            <a [routerLink]="item.path"
               routerLinkActive="bg-[#3734A9] text-white hover:bg-[#3734A9] hover:bg-opacity-90"
               [routerLinkActiveOptions]="{exact: true}"
               class="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-900 group transition-all duration-300 hover:bg-[#3734A9] hover:text-white hover:shadow-md">
              <i [class]="item.icon" class="mr-3 h-5 w-5 text-current transition-colors"></i>
              <span class="transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                {{ item.label }}
              </span>
            </a>
          </ng-container>
        </nav>

        <!-- User Profile -->
        <div class="absolute bottom-4 left-0 right-0 px-3">
          <div class="flex items-center p-2 rounded-lg hover:bg-[#3734A9] hover:text-white cursor-pointer transition-all duration-300">
            <img src="assets/p2.jpg" class="w-10 h-10 rounded-full" alt="User">
            <div class="ml-3 transition-opacity duration-300"
                 [class.opacity-0]="!isExpanded"
                 [class.hidden]="!isExpanded">
              <div class="font-medium">John Doe</div>
              <div class="text-sm text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SidebarComponent {
  @Output() sidebarStateChange = new EventEmitter<boolean>();
  isExpanded = true;
  navItems = [
    { path: '/dashboard', icon: 'bi bi-house', label: 'Dashboard' },
    { path: '/dashboard/profile', icon: 'bi bi-person', label: 'Profile' },
    { path: '/Dashproducts', icon: 'bi bi-box', label: 'Products' },
    { path: '/customers', icon: 'bi bi-people', label: 'Customers' },
    { path: '/precommands', icon: 'bi bi-clipboard-check', label: 'Pre-Orders' },
    { path: '/commands', icon: 'bi bi-file-text', label: 'Orders' },
    { path: '/analytics', icon: 'bi bi-graph-up', label: 'Analytics' },
    { path: '/settings', icon: 'bi bi-gear', label: 'Settings' },
  ];

  constructor(public router: Router) {}

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarStateChange.emit(this.isExpanded);
  }
}
