import { Component, input, OnInit } from '@angular/core';
import { HomeService } from './home-latest-modified.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-latest-modified',
  standalone: true,
  imports: [],
  styleUrls: ['./home-latest-modified.component.scss'],
  templateUrl: './home-latest-modified.component.html',
})
export class HomeLatestModifiedComponent implements OnInit {
  constructor(private homeService: HomeService, private router: Router) {}
  modified = input();
  data: any;
  ngOnInit(): void {
    this.data = this.modified();
    console.log('MDOFIED', this.data);
  }
  redirect(idProj: any, idLoc: any) {
    this.router.navigate([
      '/inwentaryzacja/' +
        JSON.stringify({
          type: 'project',
          id: idProj,
          idLoc: idLoc,
        }),
    ]);
  }
}
