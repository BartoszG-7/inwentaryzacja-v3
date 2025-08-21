import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NewDeviceForm {
  ip: string; tag: string; macAddr: string; serialNr: string; serverAddress: string; note: string; pinIfButton?: string; remoteAccessId: string; wamaNr: string; dns1: string; dns2: string; networkAddress: string; mask: string; gateway: string; przesylkaNr: string; fakturaNr: string;
}

@Component({
  selector: 'app-mag-second-dodaj',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mag-second-dodaj.component.html',
  styleUrls: ['./mag-second-dodaj.component.scss']
})
export class MagSecondDodaj {
  showModal = false;
  save = output<NewDeviceForm>();
  form: NewDeviceForm = { ip:'', tag:'', macAddr:'', serialNr:'', serverAddress:'', note:'', pinIfButton:'', remoteAccessId:'', wamaNr:'', dns1:'', dns2:'', networkAddress:'', mask:'', gateway:'', przesylkaNr:'', fakturaNr:'' };
  openModal(){ this.showModal = true; }
  closeModal(){ this.showModal = false; }
  submit(){ this.save.emit(this.form); this.closeModal(); }
  clear(){ Object.keys(this.form).forEach(k=> (this.form as any)[k]=''); }
}
