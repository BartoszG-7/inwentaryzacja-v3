import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MagazynRightSecondService } from '../../magazyn/magazyn-right-second/magazyn-right-second.service';

@Component({
  selector: 'app-mag-second-serial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mag-second-serial.html',
  styleUrl: './mag-second-serial.scss',
})
export class MagSecondSerial implements OnChanges {
  constructor(private svc: MagazynRightSecondService) {}

  @Input() devices: any[] = [];
  show = false;
  missing: any[] = [];
  idx = 0;
  currentSerial = '';

  ngOnChanges(): void {
    this.missing = (this.devices || []).filter((d) => !d?.serialNr || d.serialNr.trim() === '');
    if (this.show) this.resetCursor();
  }

  open() {
    this.missing = (this.devices || []).filter((d) => !d?.serialNr || d.serialNr.trim() === '');
    this.show = true;
    this.resetCursor();
  }
  close() { this.show = false; }

  private resetCursor() {
    this.idx = 0;
    this.currentSerial = this.missing[0]?.serialNr || '';
  }

  get hasAny(): boolean { return this.missing.length > 0; }
  get current(): any { return this.missing[this.idx] || null; }
  get canPrev(): boolean { return this.idx > 0; }
  get canNext(): boolean { return this.idx < Math.max(this.missing.length - 1, 0); }

  prev() {
    if (!this.canPrev) return;
    this.idx--; this.currentSerial = this.current?.serialNr || '';
  }
  next() {
    if (!this.canNext) return;
    this.idx++; this.currentSerial = this.current?.serialNr || '';
  }

  save() {
    const dev = this.current;
    if (!dev || !dev._id) return;
    const serial = (this.currentSerial || '').trim();
    this.svc.updateDevice(dev._id, { serialNr: serial }).subscribe({
      next: () => {
        dev.serialNr = serial;
        // After saving, remove from missing and adjust index
        this.missing.splice(this.idx, 1);
        if (this.idx >= this.missing.length) this.idx = Math.max(this.missing.length - 1, 0);
        this.currentSerial = this.current?.serialNr || '';
        if (this.missing.length === 0) this.close();
      },
      error: (e) => console.error('Failed to update serial', e),
    });
  }
}
