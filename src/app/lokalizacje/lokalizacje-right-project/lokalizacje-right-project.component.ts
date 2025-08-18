import {
  Component,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokalizacjeRightProjectService } from './lokalizacje-right-project.service';
import { UsunModalProjektComponent } from '../../components/usun-modal-projekt/usun-modal-projekt.component';

@Component({
  selector: 'app-lokalizacje-right-project',
  imports: [CommonModule, UsunModalProjektComponent],
  standalone: true,
  templateUrl: './lokalizacje-right-project.component.html',
  styleUrl: './lokalizacje-right-project.component.scss',
})
export class LokalizacjeRightProjectComponent implements OnChanges {
  constructor(
    private lokalizacjeRightProjectService: LokalizacjeRightProjectService
  ) {}
  selectedId: any = input<any>();
  project: any;
  devices: any;
  groupedRows = [
    {
      name: 'SERWER',
      rows: [
        {
          snWamasoft: '',
          snProducenta: '',
          mac: '',
          ip: '10.67.140.21',
          brama: '10.67.140.254',
          maska: '255.255.255.0',
          anydesk: '',
          dns1: '10.67.100.10',
          dns2: '10.67.100.11',
          serwer: '10.67.100.11',
        },
      ],
    },
    {
      name: 'INFOKIOSK',
      rows: [
        {
          snWamasoft: 'WMK24V/2025/0001',
          snProducenta: '',
          mac: '',
          ip: '10.67.200.10',
          brama: '10.67.200.254',
          maska: '255.255.255.0',
          anydesk: '',
          dns1: '10.67.100.10',
          dns2: '10.67.100.11',
          serwer: '10.67.100.11',
        },
      ],
    },
    {
      name: 'WAMA MED 43 C',
      rows: [
        {
          snWamasoft: 'WM43/2025/0072',
          snProducenta: '',
          mac: '',
          ip: '',
          brama: '',
          maska: '',
          anydesk: '',
          dns1: '',
          dns2: '',
          serwer: '',
        },
        {
          snWamasoft: 'WM43C/2025/0073',
          snProducenta: '',
          mac: '',
          ip: '54.87.204.98',
          brama: '',
          maska: '',
          anydesk: '',
          dns1: '',
          dns2: '',
          serwer: '',
        },
        // Add more rows as needed
      ],
    },
    {
      name: 'WAMA MED 21 C',
      rows: [
        {
          snWamasoft: 'WM21/2025/0176',
          snProducenta: '',
          mac: '',
          ip: '',
          brama: '',
          maska: '',
          anydesk: '',
          dns1: '',
          dns2: '',
          serwer: '',
        },
        // Add more rows as needed
      ],
    },
  ];

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
            console.log(e);
            this.project = e.project[0];
            this.devices = e.devices;
            console.log(this.devices);
          },
        });
    }
  }
}
