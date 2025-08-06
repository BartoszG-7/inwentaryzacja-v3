import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-stock-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngFor="let item of stockItems; let i = index">
      <div class="card mb-3 stock-card">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-0">{{item.name}}</h6>
          </div>
          <div>
            <span class="badge bg-primary">{{item.count}} szt.</span>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm ms-2">{{item.action}}</button>
          </div>
        </div>
      </div>
      <div *ngIf="i < stockItems.length - 1" class="stock-separator"></div>
    </ng-container>
  `,
  styles: [`
    .stock-card {
      border-radius: 4px !important;
    }
  
  `]
})
export class HomeStockViewComponent {
  stockItems = [
    { name: 'WAMAMED21', count: 10, action: 'EDYTUJ' },
    { name: 'WAMAMED43', count: 0, action: 'EDYTUJ' },
    { name: 'WAMAMED40', count: 48, action: 'EDYTUJ' },
    { name: 'WAMAMED45', count: 2, action: 'EDYTUJ' }
  ];
}
