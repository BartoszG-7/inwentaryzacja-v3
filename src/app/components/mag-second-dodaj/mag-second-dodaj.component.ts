// import { Component, output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface NewDeviceForm {
//   ip: string; tag: string; macAddr: string; serialNr: string; serverAddress: string; note: string; pinIfButton?: string; remoteAccessId: string; wamaNr: string; dns1: string; dns2: string; networkAddress: string; mask: string; gateway: string; przesylkaNr: string; fakturaNr: string;
// }

// @Component({
//   selector: 'app-mag-second-dodaj',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './mag-second-dodaj.component.html',
//   styleUrls: ['./mag-second-dodaj.component.scss']
// })
// export class MagSecondDodaj {
//   showModal = false;
//   save = output<NewDeviceForm>();
//   form: NewDeviceForm = { ip:'', tag:'', macAddr:'', serialNr:'', serverAddress:'', note:'', pinIfButton:'', remoteAccessId:'', wamaNr:'', dns1:'', dns2:'', networkAddress:'', mask:'', gateway:'', przesylkaNr:'', fakturaNr:'' };
//   openModal(){ this.showModal = true; }
//   closeModal(){ this.showModal = false; }
//   submit(){ this.save.emit(this.form); this.closeModal(); }
//   clear(){ Object.keys(this.form).forEach(k=> (this.form as any)[k]=''); }
// }
import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagSecondDodajService } from './mag-second-dodaj.service';
import { forkJoin } from 'rxjs';
// interface NewDeviceForm {
//   ip: string; tag: string; macAddr: string; serialNr: string; serverAddress: string; note: string; pinIfButton?: string; remoteAccessId: string; wamaNr: string; dns1: string; dns2: string; networkAddress: string; mask: string; gateway: string; przesylkaNr: string; fakturaNr: string;
// }

interface NewDeviceForm {
  przesylkaNr: string;
  fakturaNr: string;
  amount: number;
}
@Component({
  selector: 'app-mag-second-dodaj',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mag-second-dodaj.component.html',
  styleUrls: ['./mag-second-dodaj.component.scss'],
})
export class MagSecondDodaj implements OnInit {
  constructor(private dodajModalProjektService: MagSecondDodajService) {}

  save = output<NewDeviceForm>();
  form: NewDeviceForm = {
    przesylkaNr: '',
    fakturaNr: '',
  amount: 1,
  };

  devicetype = input<string>();
  refresh = output<boolean>();
  refreshState: boolean = true;
  showModal = false;
  // device = {
  //   ip: '',
  //   deviceType: '',
  //   tag: '',
  //   macAddr: '',
  //   serialNr: '',
  //   serverAddress: '',
  //   note: '',
  //   pinIfButton: '',
  //   remoteAccessId: '',
  //   project: '',
  // };
  deviceTypes: Array<any> = [];
  ngOnInit(): void {
    this.dodajModalProjektService.getDeviceTypes().subscribe({
      next: (e) => {
        e.forEach((type: any) => {
          this.deviceTypes.push({
            id: type._id,
            name: type.name,
          });
        });
      },
    });
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Example: handle form submission
  onSubmit() {
    const deviceType = this.devicetype() ?? '';
    const amount = Math.max(1, Number(this.form.amount) || 1);
    const basePayload = {
      deviceType,
      przesylkaNr: this.form.przesylkaNr?.trim() || '',
      fakturaNr: this.form.fakturaNr?.trim() || '',
    } as any;

    const requests = Array.from({ length: amount }, () =>
      this.dodajModalProjektService.saveData(basePayload)
    );

    forkJoin(requests).subscribe({
      next: () => {
        this.refresh.emit(this.refreshState);
        this.refreshState = !this.refreshState;
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        this.closeModal();
      },
    });
  }
}
