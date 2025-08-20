import { Component, input, InputSignal, OnInit, output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-treeexpander',
  imports: [],
  templateUrl: './treeexpander.html',
  styleUrl: './treeexpander.scss'
})
export class Treeexpander implements OnInit {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  projects: InputSignal<string> = input<string>('');
  location: InputSignal<string> = input<string>('');
  locationId: InputSignal<string> = input<string>('');
  showMotherboardIcon: InputSignal<boolean> = input<boolean>(false);
  refresh = input<any>(); // added to satisfy [refresh] binding in treebar.html
  expanded = false;
  names: string[] = [];
  selected = output<any>();
  // selection state
  static selectedLocationId: string | null = null;
  static selectedProjectId: string | null = null; // locationId:projectName
  static instances: Treeexpander[] = [];
  isSelected = false;
  selectedProjectIndex: number | null = null;

  ngOnInit(): void {
    this.parseProjects();
    Treeexpander.instances.push(this);
    this.isSelected = Treeexpander.selectedLocationId === this.locationId();
    this.selectedProjectIndex = null;
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
      } catch {}
    });
  }

  expand(event?: Event): void {
    // toggle selection for location similar to previous implementation
    if (
      (Treeexpander.selectedLocationId === this.locationId() && this.expanded) ||
      this.selectedProjectIndex !== null
    ) {
      // unselect
      this.selected.emit({ type: 'location', id: this.locationId() });
      Treeexpander.selectedLocationId = null;
      Treeexpander.selectedProjectId = null;
      Treeexpander.instances.forEach((inst) => {
        inst.isSelected = false;
        inst.selectedProjectIndex = null;
        if (inst === this) inst.expanded = false;
      });
    } else {
      Treeexpander.selectedLocationId = this.locationId();
      Treeexpander.selectedProjectId = null;
      Treeexpander.instances.forEach((inst) => {
        inst.isSelected = inst.locationId() === Treeexpander.selectedLocationId;
        inst.selectedProjectIndex = null;
        inst.expanded = inst === this;
      });
      this.selected.emit({ type: 'location', id: this.locationId() });
    }
    if (event && event.target && (event.target as HTMLElement).blur) {
      (event.target as HTMLElement).blur();
    }
    try { this.changeDetectorRef.detectChanges(); } catch {}
  }

  selectProject(index: number, event?: Event): void {
    Treeexpander.selectedLocationId = null;
    Treeexpander.selectedProjectId = this.locationId() + ':' + this.names[index];
    Treeexpander.instances.forEach((inst) => {
      inst.isSelected = false;
      if (inst === this) {
        inst.selectedProjectIndex = index;
      } else {
        inst.selectedProjectIndex = null;
      }
    });
    // parse id from original projects string
    let parts = this.projects().split('},');
    const raw = parts[index];
    let projectId: string | null = null;
    try {
      const obj = JSON.parse(raw.endsWith('}') ? raw : raw + '}');
      projectId = obj.id;
    } catch {}
    this.selected.emit({
      type: 'project',
      locationId: this.locationId(),
      projectId: projectId,
      projectName: this.names[index],
    });
    if (event && event.target && (event.target as HTMLElement).blur) {
      (event.target as HTMLElement).blur();
    }
    try { this.changeDetectorRef.detectChanges(); } catch {}
  }
}
