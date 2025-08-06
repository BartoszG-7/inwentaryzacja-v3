import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { HomeLatestModifiedComponent } from './home-latest-modified.component';
import { HomeStockViewComponent } from './home-stock-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HomeLatestModifiedComponent, HomeStockViewComponent],
  template: `
    <app-header></app-header>
    <div class="home-main-layout">
      <div class="home-left">
        <h4 class="mb-3">LATEST MODIFIED</h4>
        <app-home-latest-modified></app-home-latest-modified>
      </div>
      <div class="home-separator"></div>
      <div class="home-right">
        <h4 class="mb-3">QUICK STOCK VIEW</h4>
        <app-home-stock-view></app-home-stock-view>
      </div>
    </div>
  `,
  styles: [``]
})
export class HomeComponent {}
