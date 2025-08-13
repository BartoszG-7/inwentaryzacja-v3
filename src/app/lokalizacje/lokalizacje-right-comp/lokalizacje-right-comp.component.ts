import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { AddProjectComponent } from '../../components/add-project/add-project.component';

@Component({
  selector: 'app-lokalizacje-right-comp',
  imports: [AddProjectComponent],
  standalone: true,
  templateUrl: './lokalizacje-right-comp.component.html',
  styleUrl: './lokalizacje-right-comp.component.scss',
})
export class LokalizacjeRightCompComponent implements OnChanges {
  selectedId: any = input<any>();
  name: string = '';
  projects: any = [];
  address: string = '';
  mainId: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedId() !== undefined) {
      if (this.selectedId().location !== undefined) {
        this.projects = [];
        this.name = this.selectedId().location.name;
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
