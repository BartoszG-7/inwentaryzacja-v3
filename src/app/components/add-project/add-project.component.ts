import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  showEditModal = false;
  editFormData = {
    name: '',
    dns1: '',
    dns2: '',
    networkAddress: '',
    mask: '',
    gateway: '',
    addrPool: '',
    addrExclude: '',
    remoteAccessTag: '',
    location: ''
  };

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onEditSubmit(form: any) {
    if (form.valid) {
      // Handle submit logic here
      this.closeEditModal();
    }
  }
}
