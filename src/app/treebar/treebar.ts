import {
  ChangeDetectorRef,
  Component,
  Input,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { TreebarService } from './treebar.service';
import { Treeexpander } from '../treeexpander/treeexpander';
import { TreebarSharedService } from '../home/treebar.share.service';

@Component({
  selector: 'app-treebar',
  imports: [Treeexpander],
  templateUrl: './treebar.html',
  styleUrl: './treebar.scss',
})
export class Treebar implements OnInit, OnChanges {
  @Input() showMotherboardIcon: boolean = false;
  constructor(
    private treebarService: TreebarService,
    private treebarSharedService: TreebarSharedService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  data: Array<any> = [];
  selectedId = output<any>();
  stringified: string = '';
  query = input<string>('http://localhost:3000/data/treebar');
  search = input<string>();
  searchValidated: string = '{}';
  fetchedData: any;
  changeId(event: any): void {
    console.log(event);
    if (this.query() === 'http://localhost:3000/data/treebar') {
      this.selectedId.emit(
        this.treebarService.parseDataForRightComp(this.fetchedData, event)
      );
    }
    this.treebarSharedService.setData(event);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] && this.fetchedData !== undefined) {
      console.log(changes);
      this.data = [];

      this.searchValidated = this.search() ?? '';
      //if (this.search() == "[]") this.searchValidated = "";
      if (this.query() === 'http://localhost:3000/data/treebar') {
        this.data = this.treebarService.dataParser(
          this.treebarService.search(this.fetchedData, this.searchValidated)
        );
      } else {
        var locations: any = [];

        this.fetchedData.locations.forEach((location: any) => {
          if (
            location.name
              .toLowerCase()
              .includes(this.searchValidated.toLowerCase())
          ) {
            locations.push(location);
          }
        });
        this.data = this.treebarService.dataParser({ locations: locations });
      }
    }
  }
  public refetchData(): void {
    let a = '';
    this.ngOnInit();
    a = 's';
    this.ngOnChanges({ search: new SimpleChange('', '', false) });
    this.changeDetectorRef.detectChanges();
    a = '';
  }
  ngOnInit(): void {
    this.data = [];
    this.stringified = '';

    if (this.search() == '') {
      this.searchValidated = '{}';
    } else {
      this.searchValidated = this.search() ?? '';
    }
    this.treebarService.getNames(this.query()).subscribe({
      next: (data: any) => {
        // Store the fetched data in t  he component's property
        this.fetchedData = data;

        this.data = this.treebarService.dataParser(data);
        // data.locations.forEach((item: any) => {

        //   this.data.push({ "id": item._id, "name": item.name, projects: "" });

        // });
        // if (data.projects) {
        //   data.projects.forEach((item: any) => {

        //     this.data.forEach((treeItem: any) => {

        //       if (treeItem.id === item.location) {

        //         treeItem.projects = treeItem.projects + (JSON.stringify({ "name": item.name, "id": item.id }) + ",");

        //       }

        //     });
        //   });
        // }
      },
    });
  }
}
