import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagSecondEditService } from './mag-second-edit.service';

interface EditDeviceForm {
  serialNr: string;
  przesylkaNr: string;
  note: string;
  fakturaNr: string;
}

@Component({
  selector: 'app-mag-second-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mag-second-edit.component.html',
  styleUrls: ['./mag-second-edit.component.scss'],
})
export class MagSecondEdit {
  constructor(private magEditService: MagSecondEditService) {}
  showModal = false;
  elmnt = input<any>();
  device = input<any>();
  save = output<EditDeviceForm>();
  form: EditDeviceForm = {
    serialNr: '',
    przesylkaNr: '',
    note: '',
    fakturaNr: '',
  };

  openModal() {
    if (this.elmnt()) {
      this.populate();
    }
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  populate() {
    const d = this.elmnt();
    if (!d) return;
    this.form.serialNr = d.serialNr || '';
    this.form.przesylkaNr = d.przesylkaNr || '';
    this.form.note = d.note || '';
    this.form.fakturaNr = d.fakturaNr || d.wamaNr || '';
  }
  submit() {
    let id: any = this.elmnt()._id;

    this.magEditService.editData(this.form, id).subscribe({
      next(value) {
        console.log(value);
      },
    });
    this.closeModal();
  }
}
