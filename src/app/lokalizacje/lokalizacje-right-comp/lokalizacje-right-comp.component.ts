import {
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { AddProjectComponent } from '../../components/add-project/add-project.component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lokalizacje-right-comp',
  imports: [AddProjectComponent],
  standalone: true,
  templateUrl: './lokalizacje-right-comp.component.html',
  styleUrl: './lokalizacje-right-comp.component.scss',
})
export class LokalizacjeRightCompComponent implements OnChanges {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  selectedId: any = input<any>();
  name: string = '';
  projects: any = [];

  mainId: string = '';
  locationId: string = '';
  refreshOut = output<any>();
  location: any;
  refreshRight = input<any>();
  refresh(ref: any) {
    this.refreshOut.emit(ref);

    // let a = '';
    // a = 's';
    // this.ngOnChanges({});
    // this.changeDetectorRef.detectChanges();
    // a = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('selectedId:', this.selectedId());
    if (this.selectedId() !== undefined && this.selectedId().location !== undefined) {
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
}
