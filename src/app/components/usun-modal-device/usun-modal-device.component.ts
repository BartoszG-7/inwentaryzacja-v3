import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usun-modal-device',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './usun-modal-device.component.html',
  styleUrls: ['./usun-modal-device.component.scss']
})
export class UsunModalDeviceComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDelete() {
    // Add your delete logic here
    this.showModal = false;
  }
}
