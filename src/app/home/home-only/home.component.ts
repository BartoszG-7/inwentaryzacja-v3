import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { HomeLatestModifiedComponent } from '../latest-modified/home-latest-modified.component';
import { HomeStockViewComponent } from '../stock-view/home-stock-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HomeLatestModifiedComponent, HomeStockViewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: ``,

})
export class HomeComponent {

}
