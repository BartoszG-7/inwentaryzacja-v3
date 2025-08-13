import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AddProjectService } from './add-project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  constructor(
    private addProjectService: AddProjectService,
    private router: Router
  ) {}
  locationId = input<string>();
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
    projectDevices: [],
    location: '',
  };
  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onEditSubmit(form: NgForm) {
    if (form.valid) {
      // Handle submit logic here
      var addrPool: any = [];
      console.log(this.locationId());
      this.addProjectService
        .saveData({
          name: this.editFormData.name,
          dns1: this.editFormData.dns1,
          dns2: this.editFormData.dns2,
          networkAddress: this.editFormData.networkAddress,
          mask: this.editFormData.mask,
          gateway: this.editFormData.gateway,
          addrPool: this.editFormData.addrPool.split(','),
          addrExclude: this.editFormData.addrExclude,
          remoteAccessTag: this.editFormData.remoteAccessTag,
          projectDevices: [],
          location: this.locationId() ?? '',
        })
        .subscribe({
          next: (obj: any) => {
            console.log(obj);
            let currentUrl = this.router.url;
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentUrl]);
              });
          },
          error: (err) => {
            console.log(err);
          },
        });
      this.closeEditModal();
      form.reset();
    }
  }
}
