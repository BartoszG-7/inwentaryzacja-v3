import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-projekt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-projekt.component.html',
  styleUrl: './edit-projekt.component.scss'
})
export class EditProjektComponent {
  showModal = false;

  formData: any = {
    projectName: '',
    networkAddress: '',
    mask: '',
    gateway: '',
    dns1: '',
    dns2: '',
    excludedIpPools: [''],
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
    this.formData = {
      projectName: '',
      networkAddress: '',
      mask: '',
      gateway: '',
      dns1: '',
      dns2: '',
      excludedIpPools: [''],
      notes: ''
    };
  }

  addExcludedPool() {
    this.formData.excludedIpPools.push('');
  }

  removeExcludedPool(index: number) {
    if (this.formData.excludedIpPools.length > 1) {
      this.formData.excludedIpPools.splice(index, 1);
    } else {
      this.formData.excludedIpPools[0] = '';
    }
  }

  trackByExcludedPool(index: number, item: any) {
    return index;
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Edit Projekt submit', this.formData);
      this.closeModal();
    }
  }
}
