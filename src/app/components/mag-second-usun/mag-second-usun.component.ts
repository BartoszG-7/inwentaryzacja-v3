import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mag-second-usun',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mag-second-usun.component.html',
  styleUrls: ['./mag-second-usun.component.scss']
})
export class MagSecondUsun {
  showModal = false;
  deviceIds = input<string[]>();
  confirm = output<void>();

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; }
  confirmDelete() {
    this.confirm.emit();
    this.showModal = false;
  }
}
// previous stub removed
