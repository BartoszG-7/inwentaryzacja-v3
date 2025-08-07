import { Component, input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-treeexpander',
  imports: [],
  templateUrl: './treeexpander.html',
  styleUrl: './treeexpander.scss'
})
export class Treeexpander implements OnInit {
  projects: InputSignal<string> = input<string>("");
  location: InputSignal<string> = input<string>("");
  expanded: boolean = false;
  names: string[] = [];
  ngOnInit(): void {

  }
  expand(event?: Event): void {
    var array: any[] = [];
    array = this.projects().split(",");
    array.pop();
    array.forEach((project: any, ind: number) => {
      this.names[ind] = JSON.parse(project).name;
    });
    this.expanded = !this.expanded;
    if (event && event.target && (event.target as HTMLElement).blur) {
      (event.target as HTMLElement).blur();
    }
  }
}
