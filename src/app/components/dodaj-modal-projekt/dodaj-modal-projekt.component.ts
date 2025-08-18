import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dodaj-modal-projekt',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dodaj-modal-projekt.component.html',
  styleUrl: './dodaj-modal-projekt.component.scss'
})
export class DodajModalProjektComponent {
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
