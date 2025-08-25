import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStockViewService } from '../stock-view/home-stock-view.service';
import { Router } from '@angular/router';
import { LinkService } from '../../linkService';
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
    private router: Router,
    private linkService: LinkService
  ) {}
  unprocessed: any = input();
  stockItems: any[] = [];
  redirect(id: string) {
    this.linkService.setData({ type: 'deviceType', id: id });
    this.router.navigate(['/magazyn']);
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
