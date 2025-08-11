import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar-mobile',
  imports: [FormsModule],
  templateUrl: './search-bar-mobile.component.html',
  styleUrl: './search-bar-mobile.component.scss'
})
export class SearchBarMobileComponent {
  showModal = false;
  searchValue = '';

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.searchValue = '';
  }

  onSearch() {
    // Implement your search logic here
    alert('Searching for: ' + this.searchValue);
    this.closeModal();
  }
}
