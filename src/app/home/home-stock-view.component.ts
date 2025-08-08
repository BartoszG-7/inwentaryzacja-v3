import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStockViewService } from './home-stock-view.service';
@Component({
  selector: 'app-home-stock-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-stock-view.component.html',
  styleUrls: ['./home-stock-view.component.scss'],
})
export class HomeStockViewComponent implements OnInit {
  constructor(private homeStockViewService: HomeStockViewService) { }

  stockItems: any[] = [

  ];
  ngOnInit(): void {
    var deviceList: any[] = [];
    this.homeStockViewService.getUnassignedDevicesExperimental().subscribe({
      next: (data: any) => {
        console.log(data);

        this.stockItems.push({ name: data.deviceType, count: data.counter });

      }

    });



  }




}





