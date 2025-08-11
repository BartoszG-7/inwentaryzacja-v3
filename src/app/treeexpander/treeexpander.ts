import { Component, input, InputSignal, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-treeexpander',
  imports: [],
  templateUrl: './treeexpander.html',
  styleUrl: './treeexpander.scss'
})
export class Treeexpander implements OnInit {
  projects: InputSignal<string> = input<string>("");
  location: InputSignal<string> = input<string>("");
  locationId: InputSignal<string> = input<string>("");
  expanded: boolean = false;
  names: string[] = [];
  selected = output<any>();
  showMotherboardIcon: InputSignal<boolean> = input<boolean>(false);
  ngOnInit(): void {
    var array: any[] = [];
    array = this.projects().split(",");
    array.pop();

    array.forEach((project: any, ind: number) => {

      this.names[ind] = JSON.parse(project).name;
    });

  }
  expand(event?: Event): void {
    this.selected.emit({ type: "location", id: this.locationId() });
    //this.selected.emit({this.location()});
    if (this.names.length !== 0) {
      this.expanded = !this.expanded;


    }
    if (event && event.target && (event.target as HTMLElement).blur) {
      (event.target as HTMLElement).blur();
    }
  }
}
