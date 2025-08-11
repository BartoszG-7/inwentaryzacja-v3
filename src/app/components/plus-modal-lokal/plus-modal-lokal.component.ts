import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlusModalLokalService } from './plus-modal-lokal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-plus-modal-lokal',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './plus-modal-lokal.component.html',
  styleUrl: './plus-modal-lokal.component.scss'
})
export class PlusModalLokalComponent {
  constructor(private plusModalLokalService: PlusModalLokalService, private router: Router) { }
  showModal = false;
  formData = {
    name: '',
    tag: '',
    address: '',
    note: '',
    projects: []
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
      note: '',
      projects: []
    };
  }

  onSubmit(form: any) {
    if (form.valid) {

      this.plusModalLokalService.postData(this.formData).subscribe({
        next: (response: any) => {

          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        },
        error: (error: any) => {
          console.error('Error submitting data:', error);
        }
      });
      this.closeModal();
    }
  }
}
