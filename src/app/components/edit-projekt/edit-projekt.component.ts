import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditProjektService } from './edit-projekt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-projekt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-projekt.component.html',
  styleUrl: './edit-projekt.component.scss',
})
export class EditProjektComponent {
  constructor(
    private editProjektService: EditProjektService,
    private router: Router
  ) {}
  showModal = false;
  data: any = input<any>();
  formData: any = {
    name: '',
    networkAddress: '',
    mask: '',
    gateway: '',
    dns1: '',
    dns2: '',
    excludedIpPools: [''],
    notes: '',
  };

  openModal() {
    //     {
    //     "_id": "689dcbdf753d200b0cbdde0c",
    //     "name": "testsjsfdgsfd",
    //     "dns1": "0.0.0.0",
    //     "dns2": "0.0.0.0",
    //     "networkAddress": "0.0.0.0",
    //     "mask": "0.0.0.0",
    //     "gateway": "0.0.0.0",
    //     "addrPool": [
    //         "0.0.0.0"
    //     ],
    //     "addrExclude": "",
    //     "remoteAccessTag": "s",
    //     "projectDevices": [],
    //     "location": "689dc766753d200b0cbdddd0",
    //     "__v": 0
    // }

    console.log(this.data());
    let data = this.data();
    this.formData = {
      name: data.name,
      networkAddress: data.networkAddress,
      mask: data.mask,
      gateway: data.gateway,
      dns1: data.dns1,
      dns2: data.dns2,
      excludedIpPools: (data.addrExclude ?? ',').split(','),
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      name: '',
      networkAddress: '',
      mask: '',
      gateway: '',
      dns1: '',
      dns2: '',
      excludedIpPools: [''],
      notes: '',
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
      console.log(
        'Edit Projekt submit',
        this.formData.excludedIpPools.toString()
      );
      this.formData.addrExclude = this.formData.excludedIpPools.toString();
      this.editProjektService
        .saveData(this.formData, this.data()._id)
        .subscribe({
          next: (e) => {
            console.log(e);
            this.router
              .navigate([
                '/inwentaryzacja/' +
                  JSON.stringify({
                    type: 'project',
                    id: this.data()._id,
                  }),
              ])
              .then(() => {
                window.location.reload();
              });
          },
          error(err) {
            console.log(err);
          },
        });
      this.closeModal();
    }
  }
}
