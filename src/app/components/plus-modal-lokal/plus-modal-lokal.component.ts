import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-plus-modal-lokal',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './plus-modal-lokal.component.html',
  styleUrl: './plus-modal-lokal.component.scss'
})
export class PlusModalLokalComponent {
   showModal = false;
  formData = {
    name: '',
    tag: '',
    address: '',
    note: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.formData = {
      name: '',
      tag: '',
      address: '',
      note: ''
    };
  }

  onSubmit(form: any) {
    if (form.valid) {
      // TODO: Replace with actual POST logic
      alert('Form submitted! ' + JSON.stringify(this.formData));
      this.closeModal();
    }
  }
}
