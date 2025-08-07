import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './lokalizacje.service';
import { Treebar } from "../treebar/treebar";

@Component({
  selector: 'app-lokalizacje',
  imports: [HeaderComponent, Treebar],
  standalone: true,
  templateUrl: './lokalizacje.component.html',
  styleUrl: './lokalizacje.component.scss'
})
export class LokalizacjeComponent {
  locations: any[] = [];
  editing: string = '';


}
