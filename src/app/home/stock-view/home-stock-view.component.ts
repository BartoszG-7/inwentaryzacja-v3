import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStockViewService } from '../stock-view/home-stock-view.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-stock-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-stock-view.component.html',
  styleUrls: ['./home-stock-view.component.scss'],
})
export class HomeStockViewComponent implements OnInit {
  constructor(
    private homeStockViewService: HomeStockViewService,
    private router: Router
  ) {}
  unprocessed: any = input();
  stockItems: any[] = [];
  redirect(event: any) {
    console.log(event.target);
    if (event.target.id == '') {
      console.log(event.target.parentElement.parentElement);
      this.router.navigate([
        '/magazyn/' +
          JSON.stringify({
            type: 'location',
            id: event.target.parentElement.parentElement.id,
          }),
      ]);
    } else {
      this.router.navigate([
        '/magazyn/' +
          JSON.stringify({
            type: 'location',
            id: event.target.id,
          }),
      ]);
    }
  }
  ngOnInit(): void {
    this.homeStockViewService
      .processUnassignedDevices(this.unprocessed())
      .forEach((e: any) => {
        this.stockItems.push({
          id: e.deviceTypeId,
          name: e.deviceType,
          count: e.counter,
        });
      });
  }
}
