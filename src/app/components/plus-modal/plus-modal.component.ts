
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plus-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plus-modal.component.html',
  styleUrls: ['./plus-modal.component.scss']
})
export class PlusModalComponent {
  showModal = false;
  formData = {
    name: '',
    tag: '',
    maker: '',
    model: '',
    color: '',
    remoteAccessEnum: '',
    resolutionIfMonitor: '',
    lastTag: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.formData = {
      name: '',
      tag: '',
      maker: '',
      model: '',
      color: '',
      remoteAccessEnum: '',
      resolutionIfMonitor: '',
      lastTag: ''
    };
  }

  onSubmit(form: any) {
    if (form.valid) {
      // TODO: Replace with actual POST logic
      console.log(JSON.stringify(this.formData));
      this.closeModal();
    }
  }
}
