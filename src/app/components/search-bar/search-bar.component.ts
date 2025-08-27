import { Component, OnInit, output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounce, from, Observable, of, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() showFilterModal: boolean = false;
  @Input() noPaddingBottom: boolean = false;
  searchInput = output<string>();
  hello: Subject<any> = new Subject<any>();
  searchValue: string = '';

  onFilterChange(event: any): void {
    this.hello.next(event.target.value);
    
  }

  clearSearch(input: HTMLInputElement): void {
    this.searchValue = '';
    input.value = '';
    this.onFilterChange({ target: { value: '' } });
  }

  ngOnInit(): void {
    this.hello.pipe(debounce(() => timer(400))).subscribe({
      next: (data: any) => {
        this.searchInput.emit(data);
      },
    });
  }

  // Emits immediately when clicking the search icon.
  // If the field is empty, emits an empty string so parents can treat it as a request to find blank values.
  emitSearch(): void {
    this.searchInput.emit(this.searchValue ?? '');
  }
}
