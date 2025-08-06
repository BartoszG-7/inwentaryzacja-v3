import { Component } from '@angular/core';

@Component({
  selector: 'app-home-latest-modified',
  standalone: true,
  template: `
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Projekt 3</h5>
        <p class="card-text">Lokalizacja 1</p>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Projekt 1</h5>
        <p class="card-text">Lokalizacja 2</p>
      </div>
    </div>
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Projekt 1</h5>
        <p class="card-text">Lokalizacja 3</p>
      </div>
    </div>
  `,
  styles: [``]
})
export class HomeLatestModifiedComponent {}
