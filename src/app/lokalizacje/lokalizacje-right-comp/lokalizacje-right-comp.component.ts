import {
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { AddProjectComponent } from '../../components/add-project/add-project.component';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { EditLokalizacjeComponent } from '../../components/edit-lokalizacje/edit-lokalizacje.component';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { LinkService } from '../../linkService';

@Component({
  selector: 'app-lokalizacje-right-comp',
  imports: [AddProjectComponent, EditLokalizacjeComponent],
  standalone: true,
  templateUrl: './lokalizacje-right-comp.component.html',
  styleUrl: './lokalizacje-right-comp.component.scss',
})
export class LokalizacjeRightCompComponent implements OnInit, OnChanges {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private treebarSharedService: TreebarSharedService,
    private linkService: LinkService
  ) {}

  selectedId: any = input<any>();
  name: string = '';
  projects: any = [];

  mainId: string = '';
  locationId: string = '';
  refreshOut = output<any>();
  selected = output<any>();
  location: any;
  refreshRight = input<any>();

  // Presentational helper: ensure there is a space after commas in address
  get formattedAddress(): string {
    const addr = this.location?.address;
    if (!addr || typeof addr !== 'string') return addr ?? '';
    // Replace any comma optionally followed by spaces with ', '
    return addr.replace(/,\s*/g, ', ');
  }
  refresh(ref: any) {
    this.refreshOut.emit(ref);

    // let a = '';
    // a = 's';
    // this.ngOnChanges({});
    // this.changeDetectorRef.detectChanges();
    // a = '';
  }
  ngOnInit() {
    this.treebarSharedService.getData().subscribe({
      next: (value) => {
        this.projects = [];
        this.name = value.location.name;
        this.locationId = value.location._id;
        this.location = value.location;
        if (Array.isArray(value.projects)) {
          value.projects.forEach((project: any) => {
            this.projects.push(project);
          });
        }
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('selectedId:', this.selectedId());
    if (
      this.selectedId() !== undefined &&
      this.selectedId().location !== undefined
    ) {
      this.projects = [];
      this.name = this.selectedId().location.name;
      this.locationId = this.selectedId().location._id;
      this.location = this.selectedId().location;
      if (Array.isArray(this.selectedId().projects)) {
        this.selectedId().projects.forEach((project: any) => {
          this.projects.push(project);
        });
      }
      this.changeDetectorRef.detectChanges();
    }
  }

  // Emit selection events compatible with Treebar/Treeexpander
  selectLocation(event?: Event) {
    if (event && (event.target as HTMLElement).blur)
      (event.target as HTMLElement).blur();
    // Emit the same parsed object the treebar emits for a location so parent handles it identically
    try {
      this.selected.emit(this.selectedId());
    } catch (err) {
      // fallback to basic shape
      this.selected.emit({ type: 'location', id: this.location?._id });
    }
  }

  selectProject(project: any, event?: Event) {
    if (event && (event.target as HTMLElement).blur)
      (event.target as HTMLElement).blur();
    // Emit project id like the treebar does so the parent will switch to project view
    this.linkService.setData({
      type: 'project',
      id: project._id,
      idLoc: this.locationId, // must be the parent location ID string
    });
  }
}
