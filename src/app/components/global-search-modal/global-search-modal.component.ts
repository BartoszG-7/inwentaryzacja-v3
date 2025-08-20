import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-global-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './global-search-modal.component.html',
  styleUrls: ['./global-search-modal.component.scss']
})
export class GlobalSearchModalComponent {
  showModal = false;
  query = '';
  loading = false;
  results: Array<{ title: string; subtitle?: string }> = [];

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.query = '';
    this.results = [];
    this.loading = false;
  }

  onSearch() {
    if (!this.query || !this.query.trim()) {
      this.results = [];
      return;
    }

    // demo mock results (replace with real backend call)
    this.loading = true;
    setTimeout(() => {
      this.results = [
        { title: `${this.query} — Device A`, subtitle: 'Location: Magazyn' },
        { title: `${this.query} — Device B`, subtitle: 'Location: Biuro' },
      ];
      this.loading = false;
    }, 450);

    // Example backend POST (uncomment and adapt to your API)
    /*
    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: this.query })
    })
      .then(res => res.json())
      .then(data => {
        this.results = data.results || [];
        this.loading = false;
      })
      .catch(err => {
        console.error('Search error', err);
        this.loading = false;
      });
    */
  }
}
