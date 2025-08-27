import { Component, input, InputSignal, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MagSecondDodaj } from '../../components/mag-second-dodaj/mag-second-dodaj.component';
import { MagSecondEdit } from '../../components/mag-second-edit/mag-second-edit.component';
import { MagSecondUsun } from '../../components/mag-second-usun/mag-second-usun.component';
import { MagSecondSrcBar } from '../../components/mag-second-src-bar/mag-second-src-bar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MagSecondSerial } from '../../components/mag-second-serial/mag-second-serial';
import { MagazynRightSecondService } from './magazyn-right-second.service';
import { MagazynSharedService } from '../../magazynShared.service';

@Component({
  selector: 'app-magazyn-right-second',
  standalone: true,
  imports: [
    SlicePipe,
    SearchBarComponent,
    MagSecondDodaj,
    MagSecondEdit,
    MagSecondUsun,
    MagSecondSrcBar,
  MagSecondSerial,
  ],
  templateUrl: './magazyn-right-second.component.html',
  styleUrls: ['./magazyn-right-second.component.scss'],
})
export class MagazynRightSecond implements OnInit {
  constructor(
    private magazynRightSecondService: MagazynRightSecondService,
    private magazynSharedService: MagazynSharedService
  ) {}
  title: InputSignal<string> = input<string>('Monitor 21');
  total: InputSignal<number> = input<number>(71);
  data: any;
  filteredDevices: any[] = [];
  totalCount = 0;
  assignedCount = 0;
  unassignedCount = 0;
  selectedIds = new Set<string>();
  id = input<string>();
  editElement: any;
  loading = true;
  sztItems: InputSignal<number[]> = input<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  ngOnInit(): void {
    this.loadDevices();
  }

  onRefresh(_: boolean) { this.loadDevices(); }

  private loadDevices() {
    this.loading = true;
    this.magazynRightSecondService.getDevices(this.id()).subscribe({
      next: (value) => {
        this.data = value;
        this.filteredDevices = value?.device ?? [];
        const devices = this.data?.device ?? [];
        this.totalCount = devices.length;
        this.assignedCount = devices.reduce((acc: number, d: any) => acc + (d?.project ? 1 : 0), 0);
        this.unassignedCount = Math.max(this.totalCount - this.assignedCount, 0);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load devices', err);
        this.filteredDevices = [];
        this.loading = false;
      },
    });
  }
  tags: InputSignal<string[]> = input<string[]>([
    'tag1',
    'tag2',
    'tag3',
    'tag4',
    'tag5',
    'tag6',
    'tag7',
    'tag8',
    'tag9',
    'tag10',
    'tag11',
    'tag12',
  ]);

  onSearch(term: string) {
    const t = term?.toLowerCase() || '';
    if (!this.data?.device) {
      this.filteredDevices = [];
      return;
    }
    if (!t) {
      this.filteredDevices = this.data.device;
      return;
    }
    this.filteredDevices = this.data.device.filter((d: any) => {
      return [d.serialNr, d.przesylkaNr, d.note, d.wamaNr].some((v) =>
        (v || '').toString().toLowerCase().includes(t)
      );
    });
  }

  refreshMainPanel() {
    this.magazynSharedService.setBool(false);
  }

  toggleOne(id: string, checked: boolean) {
    console.log(this.filteredDevices);
    if (!id) return;
    if (checked) {
      this.selectedIds.add(id);
      let firstid = '';
      let brk = false;
      // this.selectedIds.forEach((e) => {
      //   if (!brk) firstid = e;
      //   brk = true;
      // });

      this.data.device.forEach((element: any) => {
        if (element._id === firstid) {
          this.editElement = element;
        }
      });
    } else this.selectedIds.delete(id);
  }

  isChecked(id: string): boolean {
    return !!id && this.selectedIds.has(id);
  }

  // True when the filtered list is empty or undefined
  get isDevicesEmpty(): boolean {
    return !this.filteredDevices || this.filteredDevices.length === 0;
  }

  private copyTimers = new WeakMap<HTMLElement, any>();
  formatLocationProject(d: any): string {
    const loc = d?.project?.location?.name || '';
    const proj = d?.project?.name || '';
    return loc ? `${loc}, ${proj || '-'}` : (proj || '-');
  }
  copyCell(value: string, ev?: MouseEvent) {
    try {
      ev?.preventDefault?.(); ev?.stopPropagation?.();
      const sel = window.getSelection?.();
      if (sel && sel.removeAllRanges) sel.removeAllRanges();
    } catch {}
    if (!value) return;
    navigator.clipboard.writeText(value);
    try {
      const target = (ev?.target as HTMLElement) || null;
      const span = (target?.closest?.('.trunc') as HTMLElement) ||
        ((ev?.currentTarget as HTMLElement)?.querySelector?.('.trunc') as HTMLElement);
      if (span) {
  const x = (ev as MouseEvent)?.clientX ?? 0;
  const y = (ev as MouseEvent)?.clientY ?? 0;
  span.style.setProperty('--copy-x', `${x}px`);
  span.style.setProperty('--copy-y', `${y + 12}px`);
        span.classList.add('no-select');
        const prev = this.copyTimers.get(span);
        if (prev) clearTimeout(prev);
        span.classList.add('copied');
  const t = setTimeout(() => {
          span.classList.remove('copied');
          span.classList.remove('no-select');
          this.copyTimers.delete(span);
  }, 600);
        this.copyTimers.set(span, t);
      }
    } catch {}
  }
}
