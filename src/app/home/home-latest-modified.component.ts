import { Component } from '@angular/core';

@Component({
  selector: 'app-home-latest-modified',
  standalone: true,
  template: `
    <div class="card mb-2 project-card">
      <div class="card-body py-2 px-3">
        <h6 class="card-title mb-1">Projekt 3</h6>
        <p class="card-text mb-0">Lokalizacja 1</p>
      </div>
    </div>
    <div class="card mb-2 project-card">
      <div class="card-body py-2 px-3">
        <h6 class="card-title mb-1">Projekt 1</h6>
        <p class="card-text mb-0">Lokalizacja 2</p>
      </div>
    </div>
    <div class="card mb-2 project-card">
      <div class="card-body py-2 px-3">
        <h6 class="card-title mb-1">Projekt 1</h6>
        <p class="card-text mb-0">Lokalizacja 3</p>
      </div>
    </div>
    <div class="card mb-2 project-card">
      <div class="card-body py-2 px-3">
        <h6 class="card-title mb-1">Projekt 2</h6>
        <p class="card-text mb-0">Lokalizacja 4</p>
      </div>
    </div>
    <div class="card mb-2 project-card">
      <div class="card-body py-2 px-3">
        <h6 class="card-title mb-1">Projekt 4</h6>
        <p class="card-text mb-0">Lokalizacja 5</p>
      </div>
    </div>
  `,
  styles: [`
    .project-card {
      min-height: 38px;
      max-width: 260px;
      border-radius: 8px;
      font-size: 0.9rem;
      margin-left: 0;
      margin-right: 0;
    }
  `]
})
export class HomeLatestModifiedComponent {}
