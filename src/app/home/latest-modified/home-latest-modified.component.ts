import { Component, input, OnInit } from '@angular/core';
import { HomeService } from './home-latest-modified.service';
import { Router } from '@angular/router';
import { LinkService } from '../../linkService';

@Component({
  selector: 'app-home-latest-modified',
  standalone: true,
  imports: [],
  styleUrls: ['./home-latest-modified.component.scss'],
  templateUrl: './home-latest-modified.component.html',
})
export class HomeLatestModifiedComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private router: Router,
    private linkService: LinkService
  ) {}
  modified = input();
  data: any;
  ngOnInit(): void {
    this.data = this.modified();
    if (!Array.isArray(this.data) || this.data.length === 0) {
      this.data = [
        {
          project: {
            _id: 'forced-default-id',
            name: 'Default Project',
            location: {
              _id: 'forced-default-location-id',
              name: 'Default Lokalizacja',
            }
          },
          date: new Date().toISOString()
        }
      ];
    }
    console.log('MDOFIED', this.data);
  }
  redirect(idProj: any, idLoc: any) {
    this.linkService.setData({ type: 'project', id: idProj, idLoc: idLoc });
    this.router.navigate(['/inwentaryzacja']);
  }
}
