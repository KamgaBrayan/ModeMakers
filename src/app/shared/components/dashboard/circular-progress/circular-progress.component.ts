import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circular-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 100 100">
      <!-- Background circle -->
      <circle
        cx="50"
        cy="50"
        [attr.r]="radius"
        fill="none"
        [style.stroke]="'#e2e8f0'"
        [style.stroke-width]="strokeWidth"
      />
      
      <!-- Progress circle -->
      <circle
        cx="50"
        cy="50"
        [attr.r]="radius"
        fill="none"
        [style.stroke]="'#6366f1'"
        [style.stroke-width]="strokeWidth"
        [style.stroke-dasharray]="circumference"
        [style.stroke-dashoffset]="dashOffset"
        transform="rotate(-90 50 50)"
        [style.transition]="'stroke-dashoffset 0.3s ease'"
      />
    </svg>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    svg {
      transform: rotate(-90deg);
    }
    
    circle {
      transition: stroke-dashoffset 0.3s ease;
    }
  `]
})
export class CircularProgressComponent implements OnInit, OnChanges {
  @Input() progress = 0;
  @Input() radius = 40;
  @Input() strokeWidth = 10;
  
  size = 100;
  circumference = 0;
  dashOffset = 0;
  
  ngOnInit() {
    this.calculateCircumference();
    this.calculateDashOffset();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress'] || changes['radius']) {
      this.calculateDashOffset();
    }
    if (changes['radius']) {
      this.calculateCircumference();
    }
  }
  
  private calculateCircumference() {
    this.circumference = 2 * Math.PI * this.radius;
  }
  
  private calculateDashOffset() {
    const progress = Math.min(100, Math.max(0, this.progress));
    this.dashOffset = this.circumference * (1 - progress / 100);
  }
}
