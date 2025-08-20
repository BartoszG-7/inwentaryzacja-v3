import {
  ChangeDetectorRef,
  Component,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokalizacjeRightProjectService } from './lokalizacje-right-project.service';
import { DodajModalDeviceComponent } from '../../components/dodaj-modal-device/dodaj-modal-device.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UsunModalDeviceComponent } from '../../components/usun-modal-device/usun-modal-device.component';
import { EditProjektComponent } from "../../components/edit-projekt/edit-projekt.component";

type Group = {
  id: string;
  name: string;
  devices: Array<any>;
};
@Component({
  selector: 'app-lokalizacje-right-project',
  imports: [
    CommonModule,
    DodajModalDeviceComponent,
    SearchBarComponent,
    UsunModalDeviceComponent,
    EditProjektComponent
],
  standalone: true,
  templateUrl: './lokalizacje-right-project.component.html',
  styleUrl: './lokalizacje-right-project.component.scss',
})
export class LokalizacjeRightProjectComponent implements OnChanges {
  constructor(
    private lokalizacjeRightProjectService: LokalizacjeRightProjectService
  ) {}
  devicesGrouped: Array<Group> = [];
  selectedId: any = input<any>();
  refresh: boolean = false;
  project: any;
  devices: any;
  markedDelete: Array<string> = [];
  groupedRows: any = [];
  // {
  //   name: 'SERWER',
  //   rows: [
  //     {
  //       id: '',
  //       snWamasoft: '',
  //       snProducenta: '',
  //       mac: '',
  //       ip: '10.67.140.21',
  //       brama: '10.67.140.254',
  //       maska: '255.255.255.0',
  //       anydesk: '',
  //       dns1: '10.67.100.10',
  //       dns2: '10.67.100.11',
  //       serwer: '10.67.100.11',
  //     },
  //   ],
  // },

  copyCell(value: string) {
    if (!value) return;
    navigator.clipboard.writeText(value);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedId());
    if (this.selectedId()) {
      this.lokalizacjeRightProjectService
        .getProjectData(this.selectedId())
        .subscribe({
          next: (e) => {
            this.project = e.project[0];
            this.devices = e.devices;

            e.devices.forEach((device: any) => {
              var brk = false;
              this.devicesGrouped.forEach((grouped) => {
                if (grouped.id == device.deviceType._id && !brk) {
                  grouped.devices.push(device);
                  brk = true;
                }
              });
              if (!brk) {
                this.devicesGrouped.push({
                  id: device.deviceType._id,
                  name: device.deviceType.name,
                  devices: [device],
                });
              }
            });
            this.devicesGrouped.forEach((grouped) => {
              this.groupedRows.push({
                name: grouped.name,
                rows: [],
              });
              grouped.devices.forEach((device) => {
                this.groupedRows[this.groupedRows.length - 1].rows.push({
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
          },
        });
    }
  }
  onRefresh(bool: boolean) {
    this.devicesGrouped = [];
    this.groupedRows = [];
    this.ngOnChanges({});
    this.refresh = bool;
    let a = 'a';
    a = 'b';

    // this.changeDetector.detectChanges();
    a = 'a';
  }
  checkboxChanged(event: any) {
    if (event.target.checked) {
      this.markedDelete.push(event.target.id);
    } else {
      this.markedDelete.forEach((element, ind) => {
        if (element == event.target.id) {
          this.markedDelete.splice(ind, 1);
        }
      });
    }
  }
}
