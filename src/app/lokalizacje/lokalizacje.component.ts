import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-lokalizacje',
  imports: [HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './lokalizacje.component.html',
  styleUrl: './lokalizacje.component.scss'
})
export class LokalizacjeComponent {

}
