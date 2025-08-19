import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsunModalDeviceService } from './usun-modal-device.service';

@Component({
  selector: 'app-usun-modal-device',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './usun-modal-device.component.html',
  styleUrls: ['./usun-modal-device.component.scss'],
})
export class UsunModalDeviceComponent {
  constructor(private usunModalDeviceService: UsunModalDeviceService) {}
  showModal = false;
  refresh = output<boolean>();
  refreshState: boolean = true;
  markedDelete = input<Array<string>>();
  projectId = input<string>();
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDelete() {
    // Add your delete logic here
    console.log(
      JSON.stringify({ ids: this.markedDelete(), projectId: this.projectId() })
    );
    this.usunModalDeviceService
      .unassign(this.markedDelete(), this.projectId())
      .subscribe({
        next: (e) => {
          console.log(e);
          this.refresh.emit(this.refreshState);
          this.refreshState = !this.refreshState;
        },
        error(err) {
          console.log(err);
        },
      });
    this.showModal = false;
  }
}
