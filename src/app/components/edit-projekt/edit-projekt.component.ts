import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditProjektService } from './edit-projekt.service';
import { DodajModalProjektService } from '../dodaj-modal-device/dodaj-modal-projekt.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-projekt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-projekt.component.html',
  styleUrl: './edit-projekt.component.scss',
})
export class EditProjektComponent implements OnInit {
  constructor(
    private editProjektService: EditProjektService,
    private router: Router,
    private dodajModalProjektService: DodajModalProjektService
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
    remoteAccessTag: '',
    notes: '',
  };
  deviceTypes: Array<{ id: string; name: string }> = [];
  projectDeviceRows: Array<{ typeId: string; needed: any }> = [
    { typeId: '', needed: '' },
  ];

  ngOnInit(): void {
    this.dodajModalProjektService.getDeviceTypes().subscribe({
      next: (types) => {
        (types || []).forEach((t: any) =>
          this.deviceTypes.push({ id: t._id, name: t.name })
        );
      },
    });
  }

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
      remoteAccessTag: data.remoteAccessTag || '',
    };
    // Populate required devices if present
    const pd = Array.isArray(data.projectDevices) ? data.projectDevices : [];
    if (pd.length > 0) {
      this.projectDeviceRows = pd.map((r: any) => ({
        typeId: r.typeId || r.deviceType || '',
        needed: r.neededDevices ?? r.needed ?? '',
      }));
    } else {
      this.projectDeviceRows = [{ typeId: '', needed: '' }];
    }
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
      remoteAccessTag: '',
      notes: '',
    };
    this.projectDeviceRows = [{ typeId: '', needed: '' }];
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

  addRow() {
    this.projectDeviceRows.push({ typeId: '', needed: '' });
  }
  removeRow(index: number) {
    if (this.projectDeviceRows.length > 1) {
      this.projectDeviceRows.splice(index, 1);
    }
  }

  trackByExcludedPool(index: number, item: any) {
    return index;
  }

  onSubmit(form: any) {
    if (form.valid) {
      const projectDevicesPayload: any[] = [];
      for (const row of this.projectDeviceRows) {
        const needed = Number(row.needed);
        if (row.typeId && !Number.isNaN(needed) && needed > 0) {
          projectDevicesPayload.push({
            typeId: row.typeId,
            neededDevices: needed,
          });
        }
      }
      const payload = {
        name: this.formData.name,
        dns1: this.formData.dns1,
        dns2: this.formData.dns2,
        networkAddress: this.formData.networkAddress,
        mask: this.formData.mask,
        gateway: this.formData.gateway,
        addrExclude: this.formData.excludedIpPools.toString(),
        remoteAccessTag: this.formData.remoteAccessTag,
        projectDevices: projectDevicesPayload,
      };
      this.editProjektService
        .saveData(payload, this.data()._id)
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
