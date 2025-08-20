import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditLokalizacjeService } from './edit-lokalizacje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-lokalizacje',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-lokalizacje.component.html',
  styleUrl: './edit-lokalizacje.component.scss',
})
export class EditLokalizacjeComponent {
  constructor(
    private editLokalizacjeService: EditLokalizacjeService,
    private router: Router
  ) {}
  showModal = false;
  data: any = input<any>();
  formData: any = {
    name: '',
    address: '',
    note: '',
  };

  openModal() {
    this.showModal = true;
    this.formData = {
      name: this.data().location.name,
      address: this.data().location.address,
      note: this.data().location.note,
    };
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = { name: '', address: '', note: '' };
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Edit lokalizacje submit', this.formData);
      this.editLokalizacjeService
        .saveData(this.formData, this.data().location._id)
        .subscribe({
          next: (e) => {
            console.log('RESPONSE', e);
            this.router
              .navigate([
                '/inwentaryzacja/' +
                  JSON.stringify({
                    type: 'location',
                    id: this.data().location._id,
                  }),
              ])
              .then(() => {
                window.location.reload();
              });
          },
          error(err) {
            console.log('ERROR', err);
          },
        });
      this.closeModal();
    }
  }
}
