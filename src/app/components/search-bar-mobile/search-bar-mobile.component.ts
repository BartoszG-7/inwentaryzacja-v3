import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounce, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-search-bar-mobile',
  imports: [FormsModule],
  templateUrl: './search-bar-mobile.component.html',
  styleUrl: './search-bar-mobile.component.scss'
})
export class SearchBarMobileComponent {
    searchInput = output<string>();
  hello: Subject<any> = new Subject<any>();
  onFilterChange(event: any): void {

    this.hello.next(event.target.value);
  }
  ngOnInit(): void {
    this.hello.pipe(debounce(() => timer(400))).subscribe({
      next: (data: any) => {
        this.searchInput.emit(data);
      }
    });
  }
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
