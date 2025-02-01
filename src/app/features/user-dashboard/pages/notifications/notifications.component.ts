import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../core/service/notification.service';
import { Notification } from '../../../../shared/interfaces/notification.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class NotificationsComponent implements OnInit {
  sortBy: 'popular' | 'recent' = 'popular';
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  selectedFilter: 'all' | 'read' | 'unread' = 'all';
  expandedNotifications = new Set<number>(); // Gérer l'expansion des notifications
  showFeedback: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    const id = 1; // ID temporaire pour test
    if (id) {
      this.notificationService.getUserNotifications(Number(id)).subscribe((notifications) => {
        this.notifications = notifications.map((n) => ({
          ...n,
          readed: n.readed || false, // Assurer que `readed` est défini
        }));
        this.applyFilter();
      });
    }
  }

  formatTimeAgo(date: string): string {
    const dateObj = new Date(date);
    const minutes = Math.floor((new Date().getTime() - dateObj.getTime()) / 60000);
    if (minutes < 60) return `${minutes} mins ago`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m ago`;
  }

  applyFilter(): void {
    if (this.selectedFilter === 'read') {
      this.filteredNotifications = this.notifications.filter((n) => n.readed);
    } else if (this.selectedFilter === 'unread') {
      this.filteredNotifications = this.notifications.filter((n) => !n.readed);
    } else {
      this.filteredNotifications = [...this.notifications];
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.readed = true));
    this.applyFilter();
  }

  markAsRead(notification: Notification): void {
    notification.readed = true;
    this.applyFilter();
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.applyFilter();
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
    },3000);
  }

  toggleExpand(id: number): void {
    if (this.expandedNotifications.has(id)) {
      this.expandedNotifications.delete(id);
    } else {
      this.expandedNotifications.add(id);
    }
  }
}
