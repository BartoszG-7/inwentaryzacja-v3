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
  address: string = '';
  mainId: string = '';
  locationId: string = '';
  refreshOut = output<any>();
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
    console.log(changes);

    if (this.selectedId() !== undefined) {
      if (this.selectedId().location !== undefined) {
        this.projects = [];
        this.name = this.selectedId().location.name;
        this.locationId = this.selectedId().location._id;
        this.selectedId().projects.forEach((project: any) => {
          this.projects.push(project);
        });
        if (this.selectedId().location.address) {
          this.address = this.selectedId().location.address;
        } else {
          this.address = 'BRAK ADRESU';
        }
      }
    }
  }
}
