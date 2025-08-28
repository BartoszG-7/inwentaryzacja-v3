import {
  Component,
  Injectable,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LokalizacjeRightProjectService {
  constructor(private httpClient: HttpClient) {}
  getProjectData(id: string): Observable<any> {
    return this.httpClient.get(
      'http://172.16.61.142:3000/data/get-project-data/' + id
    );
  }
  parseGroupedDevices(devicesGrouped: any) {
    var groupedRows: any = [];
    devicesGrouped.forEach((grouped: any) => {
      groupedRows.push({
        name: grouped.name,
        needed: grouped.needed ?? 0,
        assigned: (grouped.devices ?? []).length,
        rows: [],
      });
      grouped.devices.forEach((device: any) => {
        groupedRows[groupedRows.length - 1].rows.push({
          id: device._id,
          snWamasoft: device.wamaNr,
          snProducenta: device.serialNr,
          mac: device.macAddr,
          ip: device.ip,
          brama: device.gateway,
          dns1: device.dns1,
          dns2: device.dns2,
          anydesk: device.remoteAccessId,
          maska: device.mask,
          serwer: device.serverAddress,
        });
      });
    });
    return groupedRows;
  }
}
