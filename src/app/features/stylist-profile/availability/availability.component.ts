import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-availability',
  imports: [CommonModule, CalendarComponent],
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {
  @Input() daysAvailable!: string[]; // Accept an array of available days
  showCalendar: boolean = false; // State to manage calendar visibility
  currentMonth: Date = new Date(); // Initialize to the current month

  toggleCalendar() {
    this.showCalendar = !this.showCalendar; // Toggle the calendar display
  }
}