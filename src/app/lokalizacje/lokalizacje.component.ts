import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './lokalizacje.service';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-lokalizacje',
  imports: [HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './lokalizacje.component.html',
  styleUrl: './lokalizacje.component.scss'
})
export class LokalizacjeComponent implements OnInit {
  locations: any[] = [];
  editing: string = '';
  editData(id: string): void {
    this.editing = id;
  }
  saveData(id: string, name: string, address: string, tag: string, note: string): void {
    this.LocationService.saveData(id, name, address, tag, note).subscribe({
      next: (data) => {
        this.ngOnInit();

      }
    });
    this.editing = '';
  }
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
