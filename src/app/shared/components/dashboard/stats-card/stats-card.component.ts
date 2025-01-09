import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">{{ title }}</p>
          <h3 class="text-2xl font-semibold mt-1">{{ value }} {{ unit }}</h3>
        </div>
        <div [class]="'bg-' + color + '-100 p-3 rounded-full'">
          <svg [class]="'w-6 h-6 text-' + color + '-600'" [innerHTML]="icon"></svg>
        </div>
      </div>
      <span [class]="'text-' + (percentage >= 0 ? 'green' : 'red') + '-500 text-sm'">
        {{ percentage >= 0 ? '+' : '' }}{{ percentage }}%
      </span>
    </div>
  `
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() unit: string = '';
  @Input() icon: string = '';
  @Input() color: string = 'blue';
  @Input() percentage: number = 0;
}
