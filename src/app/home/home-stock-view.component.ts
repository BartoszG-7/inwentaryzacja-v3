import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-stock-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-stock-view.component.html',
  styleUrls: ['./home-stock-view.component.scss'],
})
export class HomeStockViewComponent {
  stockItems = [
    { name: 'WAMAMED21', count: 10 },
    { name: 'WAMAMED43', count: 0 },
    { name: 'WAMAMED40', count: 48 },
    { name: 'WAMAMED45', count: 2 }
  ];
}
