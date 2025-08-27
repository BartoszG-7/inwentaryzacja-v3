import {
  ChangeDetectorRef,
  Component,
  input,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokalizacjeRightProjectService } from './lokalizacje-right-project.service';
import { DodajModalDeviceComponent } from '../../components/dodaj-modal-device/dodaj-modal-device.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UsunModalDeviceComponent } from '../../components/usun-modal-device/usun-modal-device.component';
import { EditProjektComponent } from '../../components/edit-projekt/edit-projekt.component';
import { EditProjektDeviceComponent } from '../../components/edit-projekt-device/edit-projekt-device.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../../linkService';
import { DodajModalProjektService } from '../../components/dodaj-modal-device/dodaj-modal-projekt.service';

type Group = {
  id: string;
  name: string;
  devices: Array<any>;
};
@Component({
  selector: 'app-lokalizacje-right-project',
  imports: [
    CommonModule,
    DodajModalDeviceComponent,
    SearchBarComponent,
    UsunModalDeviceComponent,
    EditProjektComponent,
  EditProjektDeviceComponent,
  ],
  standalone: true,
  templateUrl: './lokalizacje-right-project.component.html',
  styleUrl: './lokalizacje-right-project.component.scss',
})
export class LokalizacjeRightProjectComponent implements OnInit, OnChanges {
  constructor(
    private lokalizacjeRightProjectService: LokalizacjeRightProjectService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  private linkService: LinkService,
  private dodajModalProjektService: DodajModalProjektService
  ) {}

  devicesGrouped: Array<Group & { needed?: number }> = [];
  selectedId = signal('');
  refresh: boolean = false;
  project: any;
  devices: any;
  markedDelete: Array<string> = [];
  groupedRows: any = [];
  urlData: any;
  loading = true;
  private deviceTypeNames = new Map<string, string>();
  // timers for transient copy tooltips keyed by the span element
  private copyTimers = new WeakMap<HTMLElement, any>();
  // Track selected header column key
  activeHeaderKey: string | null = null;
  activeSortDirection: 'asc' | 'desc' | null = null;
  private lastSearchValue: string | null = null;
  ngOnInit(): void {
    // Preload device type names for mapping required groups with no devices
    this.dodajModalProjektService.getDeviceTypes().subscribe({
      next: (types: any[]) => {
        for (const t of types || []) {
          if (t?._id && t?.name) this.deviceTypeNames.set(String(t._id), t.name);
        }
      },
    });
    this.linkService.getData().subscribe({
      next: (e) => {
        console.log(e);
        this.urlData = e;
  this.selectedId.set(e.id);
        this.ngOnChanges({});
        // this.urlData = JSON.parse(e['data']);
        console.log('URLDATA', e);
      },
    });
  }
  goToInwentaryzacja() {
  // Navigate back with a query param for location so Treebar keeps it toggled
  this.router.navigate(['/inwentaryzacja'], { queryParams: { loc: this.urlData.idLoc } });
  // Also broadcast for any listeners that rely on the event bus (race-safe via BehaviorSubject)
  this.linkService.setData({ type: 'location', id: this.urlData.idLoc });

    // this.router.navigate(['/inwentaryzacja/{}']).then(() => {
    //   window.location.reload();
    // });
  }
  // {
  //   name: 'SERWER',
  //   rows: [
  //     {
  //       id: '',
  //       snWamasoft: '',
  //       snProducenta: '',
  //       mac: '',
  //       ip: '10.67.140.21',
  //       brama: '10.67.140.254',
  //       maska: '255.255.255.0',
  //       anydesk: '',
  //       dns1: '10.67.100.10',
  //       dns2: '10.67.100.11',
  //       serwer: '10.67.100.11',
  //     },
  //   ],
  // },

  copyCell(value: string, ev?: MouseEvent) {
    // Prevent native double-click selections/callouts
    try {
      ev?.preventDefault?.(); ev?.stopPropagation?.();
      const sel = window.getSelection?.();
      if (sel && sel.removeAllRanges) sel.removeAllRanges();
    } catch {}
  if (!value) return;
  // Block selection popups for a brief period after dblclick
  this._selectionBlockUntil = Date.now() + 700;
    navigator.clipboard.writeText(value);
    // Show a small tooltip on the truncated span
    try {
      const target = (ev?.target as HTMLElement) || null;
      const span =
        (target?.closest?.('.trunc') as HTMLElement) ||
        ((ev?.currentTarget as HTMLElement)?.querySelector?.(
          '.trunc'
        ) as HTMLElement);
      if (span) {
  // set click coordinates for fixed tooltip positioning
  const x = (ev as MouseEvent)?.clientX ?? 0;
  const y = (ev as MouseEvent)?.clientY ?? 0;
  span.style.setProperty('--copy-x', `${x}px`);
  span.style.setProperty('--copy-y', `${y + 12}px`); // offset slightly below cursor
        // temporarily disable selection to avoid double-click highlight while copying
  span.classList.add('no-select');
        // clear any existing timer for this element
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

  private _selectionBlockUntil = 0;
  preventSelect(ev: Event) {
    if (Date.now() < this._selectionBlockUntil) {
      try { ev.preventDefault(); ev.stopPropagation(); } catch {}
      return false;
    }
    return true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', changes);
    console.log('SELID', this.selectedId());
    if (this.selectedId()) {
  this.loading = true;
      this.lokalizacjeRightProjectService
        .getProjectData(this.selectedId())
        .subscribe({
          next: (e) => {
            this.project = e.project[0];
            this.devices = e.devices;
            console.log('PROJECT DATA', e);
            // Map needed devices per type from the project definition
            const neededByType = new Map<string, number>();
            const pd = (this.project?.projectDevices ?? []) as Array<any>;
            for (const r of pd) {
              const typeId = (r?.typeId || r?.deviceType || '').toString();
              const needed = Number(r?.neededDevices ?? r?.needed ?? 0) || 0;
              if (typeId) neededByType.set(typeId, needed);
            }
            e.devices.forEach((device: any) => {
              var brk = false;
              this.devicesGrouped.forEach((grouped) => {
                if (String(grouped.id) == String(device.deviceType._id) && !brk) {
                  grouped.devices.push(device);
                  brk = true;
                }
              });
              if (!brk) {
                this.devicesGrouped.push({
                  id: String(device.deviceType._id),
                  name: device.deviceType.name,
                  devices: [device],
                  needed: neededByType.get(device.deviceType._id) ?? 0,
                });
              }
            });
            // Ensure groups for required device types even if 0 devices present
            for (const [typeId, needed] of neededByType.entries()) {
              const exists = this.devicesGrouped.some(g => String(g.id) === String(typeId));
              if (!exists && needed > 0) {
                this.devicesGrouped.push({
                  id: String(typeId),
                  name: this.deviceTypeNames.get(String(typeId)) || 'Typ urządzenia',
                  devices: [],
                  needed: needed,
                });
              }
            }
            this.devicesGrouped.forEach((grouped) => {
              this.groupedRows.push({
                name: grouped.name,
                needed: grouped.needed ?? 0,
                assigned: (grouped.devices ?? []).length,
                rows: [],
              });
        grouped.devices.forEach((device) => {
                this.groupedRows[this.groupedRows.length - 1].rows.push({
                  id: device._id,
                  snWamasoft: device.wamaNr,
                  snProducenta: device.serialNr,
                  mac: device.macAddr,
                  ip: device.ip,
                  brama: device.gateway,
                  dns1: device.dns1,
                  dns2: device.dns2,
                  anydesk: device.remoteAccessId,
                  maska: device.mask,
                  serwer: device.serverAddress,
          _raw: device,
                });
              });
            });
            this.loading = false;
          },
          error: (err) => {
            console.error('Failed to load project devices', err);
            this.project = this.project || {};
            this.devices = [];
            this.devicesGrouped = [];
            this.groupedRows = [];
            this.loading = false;
          },
        });
    }
  }
  onRefresh(bool: boolean) {
    console.log('REFRESH');
    this.devicesGrouped = [];
    this.groupedRows = [];
    this.ngOnChanges({});
    this.refresh = bool;
    let a = 'a';
    a = 'b';

    // this.changeDetector.detectChanges();
    a = 'a';
  }
  checkboxChanged(event: any) {
    if (event.target.checked) {
      this.markedDelete.push(event.target.id);
    } else {
      this.markedDelete.forEach((element, ind) => {
        if (element == event.target.id) {
          this.markedDelete.splice(ind, 1);
        }
      });
    }
  }
  searchNoSort(input: any) {
    console.log(input);
    const term = (input ?? '').toString();
    this.lastSearchValue = term;
    var tempSearched: any = [];
    var tempdev = JSON.parse(JSON.stringify(this.devicesGrouped));
    tempdev.forEach((devices: any) => {
      let tempDevice: any = [];
      const key = this.activeHeaderKey || 'wamaNr';
      devices.devices.forEach((device: any) => {
        const raw = device?.[key];
        const valueStr = (raw ?? '').toString();
        if (term.trim() === '') {
          // Empty search: include only items where the field is blank/undefined/null
          const isBlank = raw === null || raw === undefined || (typeof raw === 'string' && raw.trim() === '');
          if (isBlank) tempDevice.push(JSON.parse(JSON.stringify(device)));
        } else {
          if (valueStr.toLowerCase().includes(term.toLowerCase())) {
            tempDevice.push(JSON.parse(JSON.stringify(device)));
          }
        }
      });
      tempSearched.push(devices);

      tempSearched[tempSearched.length - 1].devices = tempDevice;
    });

    this.groupedRows =
      this.lokalizacjeRightProjectService.parseGroupedDevices(tempSearched);
    console.log(this.devicesGrouped);
  }
  sortAsc(key: any) {
    var tempdev = JSON.parse(JSON.stringify(this.devicesGrouped));

    tempdev.forEach((devices: any) => {
      let tempdevv = devices.devices;

      tempdevv.sort((a: any, b: any): number => {
        return (a[key] ?? '').localeCompare(b[key] ?? '');
      });
      devices.devices = tempdevv;
    });

    this.groupedRows =
      this.lokalizacjeRightProjectService.parseGroupedDevices(tempdev);
  }
  sortDesc(key: any) {
    var tempdev = JSON.parse(JSON.stringify(this.devicesGrouped));

    tempdev.forEach((devices: any) => {
      let tempdevv = devices.devices;

      tempdevv.sort((a: any, b: any): number => {
        return (b[key] ?? '').localeCompare(a[key] ?? '');
      });
      devices.devices = tempdevv;
    });

    this.groupedRows =
      this.lokalizacjeRightProjectService.parseGroupedDevices(tempdev);
  }
  toggleHeader(key: string) {
    // console.log(
    //   this.devicesGrouped[0].devices.sort((a: any, b: any): number => {
    //     return a[key].localeCompare(b[key]);
    //   })
    // );

    if (this.activeHeaderKey !== key) {
      // New header selected: highlight only, no arrow yet
      this.activeHeaderKey = key;
      console.log(this.activeHeaderKey, this.activeSortDirection);
      this.activeSortDirection = null; // phase 1: active, no arrow
      // If a search is active, re-apply it using the new column
      if (this.lastSearchValue !== null) this.searchNoSort(this.lastSearchValue);
      return;
    }

    // Same header clicked: advance phase
    if (this.activeSortDirection === null) {
      this.sortDesc(key);
      // phase 2: show down arrow
      this.activeSortDirection = 'desc';
    } else if (this.activeSortDirection === 'desc') {
      this.sortAsc(key);
      // phase 3: show up arrow
      this.activeSortDirection = 'asc';
    } else if (this.activeSortDirection === 'asc') {
      // phase 4: clear selection
      this.activeHeaderKey = null;
      this.activeSortDirection = null;
    }
    console.log(this.activeHeaderKey, this.activeSortDirection);
  }
  isHeaderActive(key: string) {
    return this.activeHeaderKey === key;
  }

  // Consider groups with a non-zero 'needed' as content, even if no rows yet
  get isDevicesEmpty(): boolean {
    const gr = this.groupedRows as Array<any> | undefined;
    if (!gr || gr.length === 0) return true;
    for (const g of gr) {
      if ((g?.rows && g.rows.length > 0) || (typeof g?.needed === 'number' && g.needed > 0)) {
        return false;
      }
    }
    return true;
  }
}
