import {
  Component,
  input,
  InputSignal,
  OnInit,
  output,
  ChangeDetectorRef,
  NgZone,
  OnChanges,
  SimpleChanges,
  Signal,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../linkService';
import { EventTypes } from '../linkService';
import { MagazynSharedService } from '../magazynShared.service';
@Component({
  selector: 'app-treeexpander',
  imports: [],
  templateUrl: './treeexpander.html',
  styleUrl: './treeexpander.scss',
})
export class Treeexpander implements OnInit, OnChanges {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private magazynSharedService: MagazynSharedService,
    private linkService: LinkService
  ) {}

  projects: InputSignal<string> = input<string>('');
  location: InputSignal<string> = input<string>('');
  locationId: InputSignal<string> = input<string>('');
  showMotherboardIcon: InputSignal<boolean> = input<boolean>(false);
  refresh = input<any>(); // added to satisfy [refresh] binding in treebar.html
  expanded = signal(false);
  names: string[] = [];
  projectsJSON: any = [];
  refresh2 = output<any>();
  testSignal = signal<any>(false);
  selected = output<any>();
  // selection state
  static selectedLocationId: string | null = null;
  static selectedProjectId: string | null = null; // locationId:projectName
  static instances: Treeexpander[] = [];
  isSelected = false;
  selectedProjectIndex: number | null = null;
  reft: any = [];
  ngOnInit(): void {
    this.parseProjects();
    Treeexpander.instances.push(this);
    console.log('EXPANDED', this.expanded);
    this.isSelected = Treeexpander.selectedLocationId === this.locationId();
    this.selectedProjectIndex = null;
    this.linkService.getData().subscribe({
      next: (value) => {
        if (
          value.type === EventTypes.DEVICE_TYPE &&
          this.showMotherboardIcon()
        ) {
          if (value.id === this.locationId()) this.isSelected = true;
        }
        if (value.type === 'location' || value.type === 'project') {
          if (
            value.id === this.locationId() ||
            value.idLoc === this.locationId()
          ) {
            this.isSelected = true;

            this.expanded.set(true);
            console.log('EXPANDED', this.location());
          }
        }
      },
    });
  }

  private parseProjects(): void {
    this.names = [];
    if (!this.projects()) return;
    let parts = this.projects().split('},');
    // Original format ended each object with '}', remove trailing empty
    if (parts[parts.length - 1] === '') parts.pop();
    parts.forEach((p, i) => {
      try {
        const obj = JSON.parse(p.endsWith('}') ? p : p + '}');

        this.names[i] = obj.name;
        this.projectsJSON.push(obj);
      } catch (e) {
        console.log(e);
      }
    });
  }

  expand(event?: Event): void {
    // Magazyn (device-type list): always select clicked item and expand it; don't toggle off
    if (this.showMotherboardIcon()) {
      this.magazynSharedService.setBool(false);
      this.linkService.setData({
        type: EventTypes.DEVICE_TYPE,
        id: this.locationId(),
      });
      Treeexpander.selectedLocationId = this.locationId();
      Treeexpander.selectedProjectId = null;
      Treeexpander.instances.forEach((inst) => {
        const lid = typeof inst.locationId === 'function' ? inst.locationId() : null;
        inst.isSelected = lid === Treeexpander.selectedLocationId;
        inst.selectedProjectIndex = null;
        inst.expanded.set(inst === this);
      });
      if (event && event.target && (event.target as HTMLElement).blur) {
        (event.target as HTMLElement).blur();
      }
      try { this.changeDetectorRef.detectChanges(); } catch {}
      return;
    }
    console.log(this.expanded);
    if (
      (Treeexpander.selectedLocationId === this.locationId() &&
        this.expanded()) ||
      this.selectedProjectIndex !== null
    ) {
      // unselect
      this.selected.emit({ type: 'location', id: this.locationId() });
      Treeexpander.selectedLocationId = null;
      Treeexpander.selectedProjectId = null;
      Treeexpander.instances.forEach((inst) => {
        inst.isSelected = false;
        inst.selectedProjectIndex = null;
        if (inst === this) inst.expanded.set(false);
        console.log('INST EXPANDED', inst.expanded());
      });
    } else {
      Treeexpander.selectedLocationId = this.locationId();
      Treeexpander.selectedProjectId = null;
      Treeexpander.instances.forEach((inst) => {
        inst.isSelected = inst.locationId() === Treeexpander.selectedLocationId;
        inst.selectedProjectIndex = null;
        inst.expanded.set(inst === this);
        console.log('INST EXPANDED', inst.expanded());
      });
      this.selected.emit({ type: 'location', id: this.locationId() });
    }
    if (event && event.target && (event.target as HTMLElement).blur) {
      (event.target as HTMLElement).blur();
    }
    try {
      this.changeDetectorRef.detectChanges();
    } catch {}
  }

  selectProject(index: number, event?: Event): void {
    console.log(this.projectsJSON[index]);
    this.linkService.setData({
      type: 'project',
      id: this.projectsJSON[index].id,
      idLoc: this.locationId(),
    });
    this.router.navigate([
      '/inwentaryzacja/' +
        JSON.stringify({
          type: 'project',
          id: this.projectsJSON[index].id,
          idLoc: this.locationId(),
        }),
    ]);
    // Treeexpander.selectedLocationId = null;
    // Treeexpander.selectedProjectId =
    //   this.locationId() + ':' + this.names[index];
    // Treeexpander.instances.forEach((inst) => {
    //   inst.isSelected = false;
    //   if (inst === this) {
    //     inst.selectedProjectIndex = index;
    //   } else {
    //     inst.selectedProjectIndex = null;
    //   }
    // });
    // // parse id from original projects string
    // let parts = this.projects().split('},');
    // const raw = parts[index];
    // let projectId: string | null = null;
    // try {
    //   const obj = JSON.parse(raw.endsWith('}') ? raw : raw + '}');
    //   projectId = obj.id;
    // } catch {}
    // this.selected.emit({
    //   type: 'project',
    //   locationId: this.locationId(),
    //   projectId: projectId,
    //   projectName: this.names[index],
    // });
    // if (event && event.target && (event.target as HTMLElement).blur) {
    //   (event.target as HTMLElement).blur();
    // }
    // try {
    //   this.changeDetectorRef.detectChanges();
    // } catch {}
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
