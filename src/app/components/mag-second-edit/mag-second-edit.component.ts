import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface EditDeviceForm { serialNr: string; przesylkaNr: string; note: string; fakturaNr: string; }

@Component({
  selector: 'app-mag-second-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mag-second-edit.component.html',
  styleUrls: ['./mag-second-edit.component.scss']
})
export class MagSecondEdit {
  showModal = false;
  device = input<any>();
  save = output<EditDeviceForm>();
  form: EditDeviceForm = { serialNr:'', przesylkaNr:'', note:'', fakturaNr:'' };

  openModal() { if(this.device()){ this.populate(); } this.showModal = true; }
  closeModal() { this.showModal = false; }
  populate(){ const d = this.device(); if(!d) return; this.form.serialNr = d.serialNr || ''; this.form.przesylkaNr = d.przesylkaNr || ''; this.form.note = d.note || ''; this.form.fakturaNr = d.fakturaNr || d.wamaNr || ''; }
  submit(){ this.save.emit(this.form); this.closeModal(); }
}
