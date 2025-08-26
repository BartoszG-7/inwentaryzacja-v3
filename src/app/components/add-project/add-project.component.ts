import { Component, OnInit, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AddProjectService } from './add-project.service';
import { Router } from '@angular/router';
import { DodajModalProjektService } from '../dodaj-modal-device/dodaj-modal-projekt.service';

@Component({
  selector: 'app-add-project',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  constructor(
    private addProjectService: AddProjectService,
    private router: Router,
    private dodajModalProjektService: DodajModalProjektService
  ) {}
  locationId = input<string>();
  showEditModal = false;
  refresh = output<any>();
  refreshState: boolean = false;
  editFormData = {
    name: '',
    dns1: '',
    dns2: '',
    networkAddress: '',
    mask: '',
    gateway: '',
  excludedIpPools: [''] as string[],
    remoteAccessTag: '',
    projectDevices: [],
    location: '',
  };

  deviceTypes: Array<{ id: string; name: string }> = [];
  projectDeviceRows: Array<{ typeId: string; needed: any }> = [
    { typeId: '', needed: '' },
  ];

  ngOnInit(): void {
    // load device types for dropdown
    this.dodajModalProjektService.getDeviceTypes().subscribe({
      next: (types) => {
        (types || []).forEach((t: any) =>
          this.deviceTypes.push({ id: t._id, name: t.name })
        );
      },
    });
  }

  addRow() {
    this.projectDeviceRows.push({ typeId: '', needed: '' });
  }

  removeRow(index: number) {
    if (this.projectDeviceRows.length > 1) {
      this.projectDeviceRows.splice(index, 1);
    }
  }
  addExcludedPool() {
    this.editFormData.excludedIpPools.push('');
  }
  removeExcludedPool(index: number) {
    if (this.editFormData.excludedIpPools.length > 1) {
      this.editFormData.excludedIpPools.splice(index, 1);
    } else {
      this.editFormData.excludedIpPools[0] = '';
    }
  }
  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  onEditSubmit(form: NgForm) {
    if (form.valid) {
    // Handle submit logic here
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
      this.addProjectService
        .saveData({
          name: this.editFormData.name,
          dns1: this.editFormData.dns1,
          dns2: this.editFormData.dns2,
          networkAddress: this.editFormData.networkAddress,
          mask: this.editFormData.mask,
          gateway: this.editFormData.gateway,
      // addrPool removed per request
      addrExclude: this.editFormData.excludedIpPools.toString(),
          remoteAccessTag: this.editFormData.remoteAccessTag,
          projectDevices: projectDevicesPayload,
          location: this.locationId() ?? '',
        })
        .subscribe({
          next: (obj: any) => {},
          error: (err) => {
            console.log(err);
          },
        });
      this.closeEditModal();
      form.reset();
  this.projectDeviceRows = [{ typeId: '', needed: '' }];
    this.editFormData.excludedIpPools = [''];
      this.refresh.emit(this.refreshState);
      this.refreshState = !this.refreshState;
    }
  }
}
