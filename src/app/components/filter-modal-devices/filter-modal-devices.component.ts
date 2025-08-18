import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-modal-devices',
  imports: [],
  templateUrl: './filter-modal-devices.component.html',
  styleUrl: './filter-modal-devices.component.scss'
})
export class FilterModalDevicesComponent {
  showModal = false;
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  onSubmit() {
    // TODO: handle filter logic
    this.closeModal();
  }

}
