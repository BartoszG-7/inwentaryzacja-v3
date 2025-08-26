import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DodajModalProjektService } from './dodaj-modal-projekt.service';

@Component({
  selector: 'app-dodaj-modal-device',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dodaj-modal-device.component.html',
  styleUrl: './dodaj-modal-device.component.scss',
})
export class DodajModalDeviceComponent implements OnInit {
  constructor(private dodajModalProjektService: DodajModalProjektService) {}
  projectId: any = input<string>();
  refresh = output<boolean>();
  refreshState: boolean = true;
  showModal = false;
  device = {
    ip: '',
    deviceType: '',
    tag: '',
    macAddr: '',
    serialNr: '',
    serverAddress: '',
    note: '',
    pinIfButton: '',
    remoteAccessId: '',
    project: '',
  };
  deviceTypes: Array<any> = [];
  ngOnInit(): void {
    this.dodajModalProjektService.getDeviceTypes().subscribe({
      next: (e) => {
        e.forEach((type: any) => {
          this.deviceTypes.push({
            id: type._id,
            name: type.name,
          });
        });
      },
    });
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Example: handle form submission
  onSubmit() {
    // Just send the device object as payload
    console.log('PROJID', this.projectId()());
    const payload = { ...this.device };
    payload.project = this.projectId()();
    // TODO: send payload to backend or emit event
    console.log('Device payload:', payload);
    this.dodajModalProjektService.saveData(payload).subscribe({
      next: (e) => {
        console.log(e);
        this.refresh.emit(this.refreshState);
        this.refreshState = !this.refreshState;
      },
      error(err) {
        console.log(err);
      },
    });
    this.closeModal();
  }
}
