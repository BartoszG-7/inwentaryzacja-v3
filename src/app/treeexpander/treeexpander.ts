import { Component, input, InputSignal, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-treeexpander',
  imports: [],
  templateUrl: './treeexpander.html',
  styleUrl: './treeexpander.scss',
})
export class Treeexpander implements OnInit {
  projects: InputSignal<string> = input<string>('');
  location: InputSignal<string> = input<string>('');
  locationId: InputSignal<string> = input<string>('');
  expanded: boolean = false;
  names: string[] = [];
  selected = output<any>();
  showMotherboardIcon: InputSignal<boolean> = input<boolean>(false);
  static selectedLocationId: string | null = null;
  static selectedProjectId: string | null = null; // project name as id
  static instances: Treeexpander[] = [];
  isSelected: boolean = false;
  selectedProjectIndex: number | null = null;

  ngOnInit(): void {
    var array: any[] = [];
    array = this.projects().split(',');
    array.pop();
    array.forEach((project: any, ind: number) => {
      this.names[ind] = JSON.parse(project).name;
    });
    Treeexpander.instances.push(this);
    this.isSelected = Treeexpander.selectedLocationId === this.locationId();
    this.selectedProjectIndex = null;
  }

  ngOnDestroy(): void {
    // Remove this instance from the static array when destroyed
    const idx = Treeexpander.instances.indexOf(this);
    if (idx > -1) {
      Treeexpander.instances.splice(idx, 1);
    }
  }

  expand(event?: Event): void {
    if (
      (Treeexpander.selectedLocationId === this.locationId() &&
        this.expanded) ||
      this.selectedProjectIndex !== null
    ) {
      this.selected.emit({ type: 'location', id: this.locationId() });
      // If already selected and expanded, or any child is selected, unselect and collapse
      Treeexpander.selectedLocationId = null;
      Treeexpander.selectedProjectId = null;
      Treeexpander.instances.forEach((instance) => {
        instance.isSelected = false;
        instance.selectedProjectIndex = null;
        if (instance === this) {
          instance.expanded = false;
        }
      });
    } else {
      // Select and expand as usual
      Treeexpander.selectedLocationId = this.locationId();
      Treeexpander.selectedProjectId = null;
      Treeexpander.instances.forEach((instance) => {
        instance.isSelected =
          instance.locationId() === Treeexpander.selectedLocationId;
        instance.selectedProjectIndex = null;
        if (instance === this) {
          instance.expanded = true;
        } else {
          instance.expanded = false;
        }
      });

      this.selected.emit({ type: 'location', id: this.locationId() });
    }
    if (event && event.target && (event.target as HTMLElement).blur) {
      (event.target as HTMLElement).blur();
    }
  }

  selectProject(index: number, event?: Event): void {
    Treeexpander.selectedLocationId = null;
    Treeexpander.selectedProjectId =
      this.locationId() + ':' + this.names[index];
    // Update selection state for all instances
    Treeexpander.instances.forEach((instance) => {
      instance.isSelected = false;
      if (
        instance.locationId() + ':' + instance.names[index] ===
        Treeexpander.selectedProjectId
      ) {
        instance.selectedProjectIndex = index;
      } else {
        instance.selectedProjectIndex = null;
      }
    });
    this.selected.emit({
      type: 'project',
      locationId: this.locationId(),
      projectName: this.names[index],
    });
    if (event && event.target && (event.target as HTMLElement).blur) {
      (event.target as HTMLElement).blur();
    }
  }
}
