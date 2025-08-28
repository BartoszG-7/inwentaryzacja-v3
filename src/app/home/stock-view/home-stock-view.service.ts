import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeStockViewService {
  constructor(private httpClient: HttpClient) {}

  getUnassignedDevices(): any {
    /*return this.httpClient.get('http://localhost:3000/device/unassigned').pipe(switchMap((data: any) => {
      return this.processUnassignedDevices(data);
    }));*/
    return new Observable((sub) => {
      sub.next('WIP');
    });
  }
  processUnassignedDevices(data: any): any[] {
    let deviceList: any[] = [];

    data.forEach((item: any) => {
      if (item.deviceType != null) {
        //zabezpieczenie przed zlymi danymi w bazie

        if (deviceList.length === 0) {
          deviceList.push({
            deviceTypeId: item.deviceType._id,
            deviceType: item.deviceType.name,
            counter: 1,
          });
          return;
        }
        var brk: boolean = false;
        deviceList.forEach((element) => {
          if (element.deviceTypeId === item.deviceType._id) {
            element.counter++;
            brk = true;
          }
        });
        if (!brk) {
          deviceList.push({
            deviceTypeId: item.deviceType._id,
            deviceType: item.deviceType.name,
            counter: 1,
          });
        }
      }
    });
    return deviceList;
  }
}
