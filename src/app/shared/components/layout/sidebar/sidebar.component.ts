import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
          class="absolute -right-3 top-10 bg-purple-600 text-white p-1 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300">
          <svg [class.rotate-180]="!isExpanded" class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex items-center mb-8" [class.justify-center]="!isExpanded">
          <img src="assets/p1.jpg" class="w-10 h-10 rounded-lg" alt="Logo">
          <span class="ml-3 text-xl font-bold transition-opacity duration-300"
                [class.opacity-0]="!isExpanded"
                [class.hidden]="!isExpanded">
            ModeMakers
          </span>
        </div>

        <!-- Navigation -->
        <ul class="space-y-2">
          <li>
            <a routerLink="/dashboard" 
               routerLinkActive="bg-purple-50 text-purple-600"
               class="flex items-center p-2 rounded-lg hover:bg-purple-50 group transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="ml-3 transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a routerLink="/products" 
               routerLinkActive="bg-purple-50 text-purple-600"
               class="flex items-center p-2 rounded-lg hover:bg-purple-50 group transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span class="ml-3 transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                Products
              </span>
            </a>
          </li>
          <li>
            <a routerLink="/orders" 
               routerLinkActive="bg-purple-50 text-purple-600"
               class="flex items-center p-2 rounded-lg hover:bg-purple-50 group transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="ml-3 transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                Orders
              </span>
            </a>
          </li>
          <li>
            <a routerLink="/customers" 
               routerLinkActive="bg-purple-50 text-purple-600"
               class="flex items-center p-2 rounded-lg hover:bg-purple-50 group transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="ml-3 transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                Customers
              </span>
            </a>
          </li>
          <li>
            <a routerLink="/commands" 
               routerLinkActive="bg-purple-50 text-purple-600"
               class="flex items-center p-2 rounded-lg hover:bg-purple-50 group transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="ml-3 transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                Commands
              </span>
            </a>
          </li>
          <li>
            <a routerLink="/analytics" 
               routerLinkActive="bg-purple-50 text-purple-600"
               class="flex items-center p-2 rounded-lg hover:bg-purple-50 group transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span class="ml-3 transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                Analytics
              </span>
            </a>
          </li>
          <li>
            <a routerLink="/settings" 
               routerLinkActive="bg-purple-50 text-purple-600"
               class="flex items-center p-2 rounded-lg hover:bg-purple-50 group transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="ml-3 transition-opacity duration-300"
                    [class.opacity-0]="!isExpanded"
                    [class.hidden]="!isExpanded">
                Settings
              </span>
            </a>
          </li>
        </ul>

        <!-- User Profile -->
        <div class="absolute bottom-4 left-0 right-0 px-3">
          <div class="flex items-center p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-all duration-300">
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

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarStateChange.emit(this.isExpanded);
  }
}
