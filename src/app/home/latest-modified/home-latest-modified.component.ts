import { Component, input, OnInit } from '@angular/core';
import { HomeService } from './home-latest-modified.service';

@Component({
  selector: 'app-home-latest-modified',
  standalone: true,
  imports: [],
  styleUrls: ['./home-latest-modified.component.scss'],
  templateUrl: './home-latest-modified.component.html'
})
export class HomeLatestModifiedComponent implements OnInit {
  constructor(private homeService: HomeService) { }
  modified = input();
  data: any;
  ngOnInit(): void {
    this.data = this.modified();
    console.log(this.data);
  }
}
