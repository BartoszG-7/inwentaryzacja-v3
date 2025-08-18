import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dodaj-modal-device',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dodaj-modal-device.component.html',
  styleUrl: './dodaj-modal-device.component.scss'
})
export class DodajModalDeviceComponent {
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
    project: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Example: handle form submission
  onSubmit() {
  // Just send the device object as payload
  const payload = { ...this.device };
  // TODO: send payload to backend or emit event
  console.log('Device payload:', payload);
  this.closeModal();
  }
}
