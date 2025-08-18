import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usun-modal-projekt',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './usun-modal-projekt.component.html',
  styleUrl: './usun-modal-projekt.component.scss'
})
export class UsunModalProjektComponent {
  showModal = false;
  project = {
    name: '',
    dns1: '',
    dns2: '',
    networkAddress: '',
    mask: '',
    gateway: '',
    addrPool: '', // comma separated string for textarea
    addrExclude: '',
    remoteAccessTag: '',
    projectDevices: '', // JSON string for textarea
    location: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Example: handle form submission
  onSubmit() {
    // Convert addrPool to array
    const addrPoolArr = this.project.addrPool.split(',').map(a => a.trim()).filter(a => a);
    // Convert projectDevices to array (assume JSON)
    let projectDevicesArr = [];
    try {
      projectDevicesArr = JSON.parse(this.project.projectDevices);
    } catch (e) {
      // handle error or leave empty
    }
    const payload = {
      ...this.project,
      addrPool: addrPoolArr,
      projectDevices: projectDevicesArr
    };
    // TODO: send payload to backend or emit event
    console.log('Project payload:', payload);
  this.closeModal();
  }
}
