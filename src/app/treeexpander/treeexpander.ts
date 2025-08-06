import { Component, input, InputSignal, OnInit } from '@angular/core';

@Component({
  selector: 'app-treeexpander',
  imports: [],
  templateUrl: './treeexpander.html',
  styleUrl: './treeexpander.scss'
})
export class Treeexpander implements OnInit {
  location: InputSignal<string> = input<string>("");
  projects: InputSignal<string> = input<string>("");
  expanded: boolean = false;
  names: string[] = [];
  ngOnInit(): void {

  }
  expand(): void {

    JSON.parse(this.projects()).forEach((project: any, ind: number) => {
      this.names[ind] = project.name;
    });
    this.expanded = !this.expanded;
  }
}
