import { Component, OnInit, output, Input } from '@angular/core';
import { FilterModalDevicesComponent } from '../filter-modal-devices/filter-modal-devices.component';
import { CommonModule } from '@angular/common';
import { debounce, from, Observable, of, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, FilterModalDevicesComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() showFilterModal: boolean = false;
  @Input() noPaddingBottom: boolean = false;
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
}
