import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './lokalizacje.service';

@Component({
  selector: 'app-lokalizacje',
  imports: [HeaderComponent],
  providers: [LocationService],
  standalone: true,
  templateUrl: './lokalizacje.component.html',
  styleUrl: './lokalizacje.component.scss'
})
export class LokalizacjeComponent implements OnInit {
  locations: any[] = [];
  constructor(private readonly LocationService: LocationService) { }
  ngOnInit(): void {

    this.LocationService.getLocations().subscribe({
      next: (data: any) => {
        this.locations = data;
        console.log(this.locations);
      }
    });
  }
}
