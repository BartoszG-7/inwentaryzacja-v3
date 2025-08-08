import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { HomeLatestModifiedComponent } from '../latest-modified/home-latest-modified.component';
import { HomeStockViewComponent } from '../stock-view/home-stock-view.component';
import { HomeService } from './home.component.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HomeLatestModifiedComponent, HomeStockViewComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  template: ``,

})
export class HomeComponent {
  constructor(private homeService: HomeService) { }
  modified: any;
  stock: any;
  ngOnInit() {
    this.homeService.getData().subscribe({
      next: (data) => {
        console.log(data);
        this.modified = data.modified;
        this.stock = data.stock;
        console.log(this.modified);
      }
    })
  }
}
