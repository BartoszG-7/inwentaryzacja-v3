import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagSecondEditService } from '../mag-second-edit/mag-second-edit.service';

@Component({
  selector: 'app-edit-projekt-device',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-projekt-device.component.html',
  styleUrl: './edit-projekt-device.component.scss',
})
export class EditProjektDeviceComponent {
  constructor(private editService: MagSecondEditService) {}
  showModal = false;
  device = input<any>();
  saved = output<void>();

  form: any = {
    wamaNr: '',
    serialNr: '',
    tag: '',
    macAddr: '',
    ip: '',
    gateway: '',
    mask: '',
    remoteAccessId: '',
    dns1: '',
    dns2: '',
    serverAddress: '',
    note: '',
    pin: '',
    przesylkaNr: '',
    fakturaNr: '',
  };

  openModal() {
    const d = this.device();
    if (d) {
      this.form.wamaNr = d.wamaNr || '';
      this.form.serialNr = d.serialNr || '';
      this.form.tag = d.tag || '';
      this.form.macAddr = d.macAddr || d.macAddress || '';
      this.form.ip = d.ip || '';
      this.form.gateway = d.gateway || '';
      this.form.mask = d.mask || '';
      this.form.remoteAccessId = d.remoteAccessId || '';
      this.form.dns1 = d.dns1 || '';
      this.form.dns2 = d.dns2 || '';
      this.form.serverAddress = d.serverAddress || '';
      this.form.note = d.note || '';
      this.form.pin = d.pin || d.pinIfButton || '';
      this.form.przesylkaNr = d.przesylkaNr || '';
      this.form.fakturaNr = d.fakturaNr || '';
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submit() {
    const d = this.device();
    if (!d?._id) {
      this.closeModal();
      return;
    }
    // Send both DTO and schema-compatible keys where they differ
    const payload = {
      ...this.form,
      macAddress: this.form.macAddr,
      pinIfButton: this.form.pin,
    };
    this.editService.editData(payload, d._id).subscribe({
      next: () => {
        this.saved.emit();
        this.closeModal();
      },
      error: () => {
        // still close to avoid trapping the UI; parent can refresh manually
        this.closeModal();
      },
    });
  }
}
