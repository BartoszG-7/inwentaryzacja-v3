
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlusModalService } from './plus-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plus-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plus-modal.component.html',
  styleUrls: ['./plus-modal.component.scss']
})
export class PlusModalComponent {
  constructor(private plusModalService: PlusModalService, private router: Router) { }
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
      this.plusModalService.postData(this.formData).subscribe({
        next: (response: any) => {
          console.log('Data submitted successfully:', response);
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
