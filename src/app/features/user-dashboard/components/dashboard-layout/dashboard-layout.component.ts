// dashboard-layout.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class DashboardLayoutComponent {
  isSidebarOpen = true;
  currentUser = {
    name: 'Junior Rousseau',
    image: '/assets/images/profile.jpg'
  };

  navItems = [
    { path: '/user-dashboard/profil', icon: 'user', label: 'Profil' },
    { path: '/user-dashboard/favoris', icon: 'heart', label: 'Favoris' },
    { path: '/user-dashboard/commandes', icon: 'shopping-bag', label: 'Commandes' },
    { path: '/user-dashboard/notifications', icon: 'bell', label: 'Notifications' },
    { path: '/user-dashboard/mensurations', icon: 'ruler', label: 'Mensurations' },
  ];

  constructor(private router: Router) {}

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    // Implement logout logic
  }
}



