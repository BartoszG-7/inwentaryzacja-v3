import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.homeService.getNamesAndDate().subscribe({
      next: (data: any) => {
        console.log('Latest modified data:', data);
      },
      error: (err) => {
        console.error('Error fetching latest modified data:', err);
      }
    });

  }
}
