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
    console.log(this.data);
  }
  redirect(event: any) {
    if (event.target.parentElement.id == '') {
      console.log(event.target.parentElement.parentElement.id);
      this.router.navigate([
        '/inwentaryzacja/' +
          JSON.stringify({
            type: 'project',
            id: event.target.parentElement.parentElement.id,
          }),
      ]);
    } else {
      this.router.navigate([
        '/inwentaryzacja/' +
          JSON.stringify({
            type: 'project',
            id: event.target.parentElement.id,
          }),
      ]);
    }
  }
}
