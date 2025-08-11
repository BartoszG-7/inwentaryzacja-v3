import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-comp',
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './main-comp.component.html',
  styleUrl: './main-comp.component.scss'
})

export class MainCompComponent {

}
