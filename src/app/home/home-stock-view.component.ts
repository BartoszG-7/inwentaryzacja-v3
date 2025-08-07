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

    this.homeStockViewService.getUnassignedDevices().subscribe({
      next: (data: any) => {

        data.forEach((item: any) => {
          if (deviceList.length === 0) {
            deviceList.push({ deviceTypeId: item.deviceType._id, deviceType: item.deviceType.name, counter: 1 });
            return;
          }
          deviceList.forEach(element => {
            if (element.deviceTypeId === item.deviceType._id) {
              element.counter++;

            } else {
              deviceList.push({ deviceTypeId: item.deviceType._id, deviceType: item.deviceType.name, counter: 1 });
              return;
            }
          });

        });

        console.log('Unassigned devices:', deviceList);
        deviceList.forEach(item => {
          console.log('Stock items:', item);
          this.stockItems.push({ name: item.deviceType, count: item.counter });
        });
      }
    });



  }
}
