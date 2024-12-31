import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-sort',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-sort.component.html',
  styleUrls: ['./select-sort.component.css'],
})
export class SelectSortComponent {
  selectedSort: string = 'popularity'; // Default sort criteria

  @Output() sortChanged = new EventEmitter<string>();

  // Emit the selected sort type
  onSortChange() {
    this.sortChanged.emit(this.selectedSort);
  }
}

