import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagSecondUsunService } from './mag-second-usun.service';
import { MagSecondEditService } from '../mag-second-edit/mag-second-edit.service';

@Component({
  selector: 'app-mag-second-usun',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mag-second-usun.component.html',
  styleUrls: ['./mag-second-usun.component.scss'],
})
export class MagSecondUsun {
  constructor(
    private magSecondUsunService: MagSecondUsunService,
    private magEditService: MagSecondEditService
  ) {}
  showModal = false;
  deviceIds = input<string[]>();

  confirm = output<void>();
  Ids = input<any>();
  openModal() {
    this.showModal = true;
    console.log(this.Ids());
  }
  closeModal() {
    this.showModal = false;
  }
  confirmDelete() {
    let tempids: any[] = [];
    this.Ids().forEach((element: any) => {
      tempids.push(element);
    });
    console.log(tempids);
    this.magSecondUsunService.delData({ ids: tempids }).subscribe({
      next: (value) => {
        console.log(value);
        this.magEditService.sendRefresh();
      },
      error(err) {
        console.log(err);
      },
    });
    this.showModal = false;
  }
}
// previous stub removed
