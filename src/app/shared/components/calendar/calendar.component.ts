import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [CommonModule],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
    @Input() currentMonth!: Date; // Accept current month from the parent component
    daysInMonth: number[] = []; // Array to hold the days of the month
    monthName: string = ''; // To hold the name of the current month
  
    ngOnInit() {
      this.calculateDaysInMonth();
    }
  
    calculateDaysInMonth() {
      const year = this.currentMonth.getFullYear();
      const month = this.currentMonth.getMonth(); // 0-indexed month
      const daysInCurrentMonth = new Date(year, month + 1, 0).getDate(); // Get the last date of the month
  
      this.daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1); // Create an array of days
      this.monthName = this.currentMonth.toLocaleString('default', { month: 'long' }); // Get the month name
    }
  }