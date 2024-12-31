import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

@Component({
  selector: 'app-notifications',
  template: `
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold text-gray-900">Mes Notifications</h1>
    <div class="relative">
      <select
              class="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3734A9]">
        <option value="popular">Sort by: Popular</option>
        <option value="recent">Sort by: Recent</option>
      </select>
      <div class="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
        <i class="fas fa-chevron-down text-gray-400"></i>
      </div>
    </div>
  </div>

  <div class="space-y-4">
    @for (notification of notifications; track notification.id) {
      <div class="bg-white rounded-lg border p-4 flex items-start gap-4 hover:shadow-lg transition-shadow">
        <div class="w-10 h-10 rounded-full bg-[#3734A9] bg-opacity-10 flex items-center justify-center flex-shrink-0">
          <i class="fas fa-bell text-[#3734A9]"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start">
            <h3 class="text-base font-medium text-gray-900">{{notification.title}}</h3>
            <span class="text-sm text-gray-500">{{formatTimeAgo(notification.timestamp)}}</span>
          </div>
          <p class="mt-1 text-sm text-gray-600">{{notification.message}}</p>
        </div>
      </div>
    }
  </div>

`,
  standalone: true,
  imports: [FormsModule]
})
export class NotificationsComponent {
  sortBy: 'popular' | 'recent' = 'popular';
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle collection disponible',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq',
      timestamp: new Date(),
      isRead: false
    },
    // Add more notifications...
  ];

  formatTimeAgo(date: Date): string {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes} mins ago`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m ago`;
  }
}
