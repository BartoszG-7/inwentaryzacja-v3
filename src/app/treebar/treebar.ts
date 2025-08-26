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
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService, EventTypes } from '../linkService';

@Component({
  selector: 'app-treebar',
  imports: [Treeexpander],
  templateUrl: './treebar.html',
  styleUrl: './treebar.scss',
})
export class Treebar implements OnInit, OnChanges {
  @Input() showMotherboardIcon: boolean = false;
  @Input() autoSelectFirst: boolean = false; // only true in Magazyn to avoid interfering with Infokiosk
  constructor(
    private treebarService: TreebarService,
    private treebarSharedService: TreebarSharedService,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private linkService: LinkService
  ) {}

  data: Array<any> = [];
  selectedId = output<any>();
  stringified: string = '';
  query = input<string>('http://localhost:3000/data/treebar');
  search = input<string>();
  searchValidated: string = '{}';
  stopProj: boolean = false;
  refresh: boolean = false;
  currentId: any;
  fetchedData: any;
  private externalSelect = false; // set when another part of app selects something explicitly
  changeId(event: any): void {
    console.log(event);

    if (this.query() === 'http://localhost:3000/data/treebar') {
      if (event.type === 'location') {
        console.log(event);

        this.currentId = event;
        this.selectedId.emit(
          this.treebarService.parseDataForRightComp(this.fetchedData, event)
        );
        console.log('DATA SENT');
        this.treebarSharedService.setData(
          this.treebarService.parseDataForRightComp(this.fetchedData, event)
        );
      }

      if (event.type === 'project') {
        event.stopProj = this.stopProj;
        this.selectedId.emit(event.projectId);
        console.log('DATA SENT');
        this.treebarSharedService.setData(event);
      }
    } else {
      console.log('DATA SENT');
      this.treebarSharedService.setData(event);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] && this.fetchedData !== undefined) {
      this.data = [];
      console.log(changes);
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
    console.log('refetch');
    let a = '';
    this.treebarService.getNames(this.query()).subscribe({
      next: (data: any) => {
        // Store the fetched data in t  he component's property
        console.log(data);
        this.fetchedData = data;

        this.data = this.treebarService.dataParser(data);
        a = 's';
        this.ngOnChanges({ search: new SimpleChange('', '', false) });
        console.log('CHANGED ID TREEBAR');
        // this.changeId(this.currentId);
        this.changeDetectorRef.detectChanges();
        this.refresh = !this.refresh;

        a = '';
      },
    });
  }
  ngOnInit(): void {
    this.data = [];
    this.stringified = '';
    this.linkService.getData().subscribe({
      next: (value) => {
        if (value) {
          // If Magazyn (device-type list) receives an explicit selection, don't auto-select first
          if (
            this.query() === 'http://localhost:3000/device-type/list' &&
            value.type === EventTypes.DEVICE_TYPE
          ) {
            this.externalSelect = true;
            // Ensure only the selected device type is highlighted and expanded
            try {
              (Treeexpander as any).selectedLocationId = value.id;
              (Treeexpander as any).selectedProjectId = null;
              (Treeexpander as any).instances?.forEach((inst: any) => {
                const lid =
                  typeof inst.locationId === 'function' ? inst.locationId() : null;
                inst.isSelected = lid === value.id;
                inst.selectedProjectIndex = null;
                inst.expanded.set(lid === value.id);
                if (inst.changeDetectorRef) {
                  try { inst.changeDetectorRef.detectChanges(); } catch {}
                }
              });
            } catch {}
          }
        }
        if (this.fetchedData === undefined) {
          this.refetchData();
        }

        if (value.type === 'project') {
          this.treebarSharedService.setData(
            this.treebarService.parseDataForRightComp(this.fetchedData, {
              type: 'location',
              id: value.idLoc,
            })
          );
        }
      },
    });
    if (this.search() == '') {
      this.searchValidated = '{}';
    } else {
      this.searchValidated = this.search() ?? '';
    }
    this.treebarService.getNames(this.query()).subscribe({
      next: (data: any) => {
        this.fetchedData = data;
        this.data = this.treebarService.dataParser(data);
        //{"type":"project","id":"6895b53d4c2a9be9747d332b"}
        //{"type":"location","id":"6895b3254c2a9be9747d3327"}
        //project and location redir
        this.activatedRoute.params.subscribe({
          next: (e) => {
            if (e['data'] !== undefined) {
              console.log(e['data']);
              console.log('DATA SENT');
              this.treebarSharedService.setData(JSON.parse(e['data']));
              let data = JSON.parse(e['data']);
              if (data !== '{}') {
                if (data.type === 'project') {
                  if (!data.stopProj) {
                    this.selectedId.emit(data.id);
                  } else {
                    this.stopProj = true;
                    Treeexpander.instances.forEach((instance) => {
                      console.log('INSTANCES', JSON.parse(instance.projects()));
                    });
                    this.setTRX('location', data.id);
                  }
                } else if (data.type === 'location') {
                  this.setTRX('location', data.id);
                  console.log(this.fetchedData);
                  this.selectedId.emit(
                    this.treebarService.parseDataForRightComp(
                      this.fetchedData,
                      { type: 'location', id: data.id }
                    )
                  );
                }
              }
            }
            if (e['data'] == '{}') {
              // No routing data: auto-select first element (location) if available
              if (this.autoSelectFirst && this.data.length > 0 && !this.externalSelect) {
                console.log('TREEBAR FIRST ELEMENT SET');
                const first = this.data[0];
                console.log(first);
                const evt = { type: 'location', id: first.id };
                this.currentId = evt;
                this.changeId(evt);
                // sync Treeexpander static selection state if instances already exist
                try {
                  (Treeexpander as any).selectedLocationId = first.id;
                  (Treeexpander as any).instances?.forEach((inst: any) => {
                    const lid =
                      typeof inst.locationId === 'function'
                        ? inst.locationId()
                        : null;
                    inst.isSelected = lid === first.id;
                    inst.selectedProjectIndex = null;

                    inst.expanded.set(lid === first.id);

                    if (inst.changeDetectorRef) {
                      try {
                        inst.changeDetectorRef.detectChanges();
                      } catch {}
                    }
                  });
                } catch {}
                // Also publish deviceType selection only when device-type list is used and auto-select enabled
                if (this.query() === 'http://localhost:3000/device-type/list') {
                  try {
                    this.linkService.setData({
                      type: EventTypes.DEVICE_TYPE,
                      id: first.id,
                    });
                  } catch {}
                }
              }
            } else if (
              this.autoSelectFirst &&
              e['data'] === undefined &&
              this.query() === 'http://localhost:3000/device-type/list' &&
              this.data.length > 0 &&
              !this.externalSelect
            ) {
              // Magazyn opened without params: auto-select first device type
              const first = this.data[0];
              this.setTRX('location', first.id);
              try {
                this.linkService.setData({
                  type: EventTypes.DEVICE_TYPE,
                  id: first.id,
                });
              } catch {}
            }
          },
        });
      },
    });
  }
  setTRX(type: string, id: string) {
    const evt = { type: type, id: id };
    this.currentId = evt;
    this.changeId(evt);
    console.log('SETRX', type);
    // sync Treeexpander static selection state if instances already exist
    if (type === 'location') {
      try {
        (Treeexpander as any).selectedLocationId = id;
        console.log('INSTANCES', Treeexpander.instances);
        (Treeexpander as any).instances.forEach((inst: any) => {
          console.log('INSTANCES', Treeexpander.instances);
          const lid =
            typeof inst.locationId === 'function' ? inst.locationId() : null;

          inst.isSelected = lid === id;
          inst.selectedProjectIndex = null;
          inst.expanded.set(lid === id);
          console.log('LID', inst.expanded);
          if (inst.changeDetectorRef) {
            try {
              inst.changeDetectorRef.detectChanges();
            } catch {}
          }
        });
      } catch (err) {
        console.log('TRXERR', err);
      }
    }
    if (type === 'project') {
      try {
        (Treeexpander as any).selectedLocationId = id;
        (Treeexpander as any).instances?.forEach((inst: any) => {
          const lid =
            typeof inst.locationId === 'function' ? inst.locationId() : null;

          console.log('LID', lid);
          inst.isSelected = lid === id;
          inst.selectedProjectIndex = null;
          inst.expanded.set(lid === id);
          console.log('INST EXPANDED', inst.expanded);
          if (inst.changeDetectorRef) {
            try {
              inst.changeDetectorRef.detectChanges();
            } catch {}
          }
        });
      } catch {}
    }
  }
  refreshTRX(event: any) {
    this.refresh = !this.refresh;
  }
}
