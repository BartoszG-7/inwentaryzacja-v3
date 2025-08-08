import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStockViewService } from '../stock-view/home-stock-view.service';
@Component({
  selector: 'app-home-stock-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-stock-view.component.html',
  styleUrls: ['./home-stock-view.component.scss'],
})
export class HomeStockViewComponent implements OnInit {
  constructor(private homeStockViewService: HomeStockViewService) { }
  unprocessed: any = input();
  stockItems: any[] = [

  ];
  ngOnInit(): void {



    this.homeStockViewService.processUnassignedDevices(this.unprocessed()).forEach((e: any) => {
      this.stockItems.push({ name: e.deviceType, count: e.counter });
    });




  }




}





