import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from "../components/footer/footer.component";
import { HomeLatestModifiedComponent } from './home-latest-modified.component';
import { HomeStockViewComponent } from './home-stock-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, HomeLatestModifiedComponent, HomeStockViewComponent],
  template: `
    <app-header></app-header>
    <div class="container py-4">
      <div class="row align-items-stretch">
        <div class="col-12 col-md-4 mb-4">
          <h4 class="mb-3">LATEST MODIFIED</h4>
          <app-home-latest-modified></app-home-latest-modified>
        </div>
        <div class="d-none d-md-flex col-md-1 justify-content-center align-items-center px-0">
          <div style="width:2px; background:#e0e0e0; height:100%; min-height:400px;"></div>
        </div>
        <div class="col-12 col-md-7 mb-4">
          <h4 class="mb-3">QUICK STOCK VIEW</h4>
          <app-home-stock-view></app-home-stock-view>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class HomeComponent {}
