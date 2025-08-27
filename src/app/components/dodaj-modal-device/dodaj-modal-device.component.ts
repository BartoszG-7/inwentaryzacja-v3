import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DodajModalProjektService } from './dodaj-modal-projekt.service';
import { MagazynRightSecondService } from '../../magazyn/magazyn-right-second/magazyn-right-second.service';

@Component({
  selector: 'app-dodaj-modal-device',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './dodaj-modal-device.component.html',
  styleUrl: './dodaj-modal-device.component.scss',
})
export class DodajModalDeviceComponent implements OnInit {
  constructor(
    private dodajModalProjektService: DodajModalProjektService,
    private magazynSecondService: MagazynRightSecondService
  ) {}
  projectId: any = input<string>();
  refresh = output<boolean>();
  refreshState: boolean = true;
  showModal = false;
  // Assignment state
  deviceTypes: Array<{ id: string; name: string }> = [];
  selectedTypeId: string = '';
  loadingDevices = false;
  devices: Array<any> = [];
  selected: Record<string, boolean> = {};
  // Tracks which devices were assigned to this project at load time for the chosen type
  currentAssigned: Record<string, boolean> = {};
  assigning = false;
  errorMsg: string | null = null;
  disabled: Record<string, boolean> = {};
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
    this.devices = [];
    this.selected = {};
    this.currentAssigned = {};
    this.selectedTypeId = '';
    this.errorMsg = null;
  }
  onTypeChange() {
    if (!this.selectedTypeId) {
      this.devices = [];
      this.selected = {};
      this.currentAssigned = {};
      return;
    }
    this.loadingDevices = true;
    this.errorMsg = null;

    this.magazynSecondService.getDevices(this.selectedTypeId).subscribe({
      next: (resp: any) => {
        // resp.device is the list
        this.devices = Array.isArray(resp?.device) ? resp.device : [];
        this.selected = {};
        this.currentAssigned = {};
        const projId = (this.projectId()() as unknown as string) || '';
        for (const d of this.devices) {
          const did = d?._id as string;
          console.log(this.projectId()());
          const taken =
            d?.project?._id && d?.project?._id !== this.projectId()();
          const assignedHere =
            !!projId &&
            (d?.project?._id?.toString?.() ?? d?.project?._id) === projId;
          if (did) {
            this.currentAssigned[did] = assignedHere;
            // Pre-check items already assigned to this project
            this.disabled[did] = taken;
            this.selected[did] = assignedHere;
          }
        }
        this.loadingDevices = false;
      },
      error: (err) => {
        this.loadingDevices = false;
        this.errorMsg = 'Nie udało się załadować listy urządzeń.';
        console.error(err);
      },
    });
  }
  toggleOne(id: string, checked: boolean) {
    this.selected[id] = checked;
  }
  assignSelected() {
    const projId = this.projectId() as unknown as string;
    if (!projId) return;
    // Compute diffs
    const selectedIds = Object.keys(this.selected).filter(
      (k) => this.selected[k]
    );
    const originallyAssignedIds = Object.keys(this.currentAssigned).filter(
      (k) => this.currentAssigned[k]
    );
    const selectedSet = new Set(selectedIds);
    const originalSet = new Set(originallyAssignedIds);
    const toAdd: string[] = [];
    const toRemove: string[] = [];
    // Add if selected now but not originally assigned
    for (const id of selectedSet) if (!originalSet.has(id)) toAdd.push(id);
    // Remove if originally assigned but not selected now
    for (const id of originalSet) if (!selectedSet.has(id)) toRemove.push(id);

    // If no changes, just close
    if (toAdd.length === 0 && toRemove.length === 0) {
      this.closeModal();
      return;
    }

    this.assigning = true;
    this.errorMsg = null;
    const total = toAdd.length + toRemove.length;
    let done = 0;
    let failed = 0;

    const checkDone = () => {
      done++;
      if (done === total) this._doneAssign(failed);
    };

    // Process additions
    for (const id of toAdd) {
      console.log(this.projectId()());
      this.dodajModalProjektService
        .addToProject({ deviceId: id, projectId: this.projectId()() })
        .subscribe({
          next: () => checkDone(),
          error: (err: unknown) => {
            failed++;
            console.error('Assign failed for', id, err);
            checkDone();
          },
        });
    }
    // Process removals
    for (const id of toRemove) {
      this.dodajModalProjektService
        .removeFromProject({ deviceId: id, projectId: projId })
        .subscribe({
          next: () => checkDone(),
          error: (err: unknown) => {
            failed++;
            console.error('Unassign failed for', id, err);
            checkDone();
          },
        });
    }
  }
  private _doneAssign(failed: number) {
    this.assigning = false;
    if (failed === 0) {
      this.refresh.emit(this.refreshState);
      this.refreshState = !this.refreshState;
      this.closeModal();
    } else {
      this.errorMsg = 'Część urządzeń nie udało się przypisać.';
    }
  }
}
