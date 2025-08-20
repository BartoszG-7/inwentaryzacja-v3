import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-lokalizacje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-lokalizacje.component.html',
  styleUrl: './edit-lokalizacje.component.scss'
})
export class EditLokalizacjeComponent {
  showModal = false;

  formData: any = {
    name: '',
    address: '',
    notes: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = { name: '', address: '', notes: '' };
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Edit lokalizacje submit', this.formData);
      this.closeModal();
    }
  }
}
