import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-magazyn',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './magazyn.component.html',
  styleUrl: './magazyn.component.scss'
})
export class MagazynComponent {

}
