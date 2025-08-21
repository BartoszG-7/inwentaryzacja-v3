import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounce, debounceTime, interval, Subject, timer } from 'rxjs';
import { GlobalSearchModalService } from './global-search-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './global-search-modal.component.html',
  styleUrls: ['./global-search-modal.component.scss'],
})
export class GlobalSearchModalComponent implements OnChanges {
  constructor(
    private globalSearchModalService: GlobalSearchModalService,
    private router: Router
  ) {}
  showModal = false;
  query = '';
  search = new Subject<any>();
  loading = false;
  results: Array<[{ title: string; subtitle?: string; id: string }]> = [];
  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', changes);
  }
  changeResults(res: any) {
    res.forEach((element: any, ind: number) => {
      console.log(this.loading);
      this.results[ind] = element;
    });
  }
  openModal(results: any = this.results): void {
    this.showModal = true;
    var resultsTemp: any = [];
    this.search.pipe(debounce(() => timer(400))).subscribe({
      next: (e) => {
        // results = [];
        this.globalSearchModalService.search(e).subscribe({
          next(value) {
            resultsTemp = [];
            results.pop();
            value.forEach((element: any) => {
              if (!element.project) element.project = { name: 'BRAK PROJEKTU' };
              resultsTemp.push({
                title: element.serialNr,
                subtitle: element.project.name ?? '',
                id: element.project._id,
              });
            });

            results.push(resultsTemp);
            console.log(results);
          },
        });
      },
    });
  }

  closeModal() {
    this.showModal = false;
    this.query = '';
    this.results = [];
    this.loading = false;
  }

  emit(event: any) {
    this.search.next(event.target.value);
  }
  redir(data: any) {
    console.log(data);
    this.router
      .navigate([
        '/inwentaryzacja/' + JSON.stringify({ type: 'project', id: data.id }),
      ])
      .then(() => {
        window.location.reload();
      });
  }
  onSearch() {
    this.search.next(this.query);
    if (!this.query || !this.query.trim()) {
      this.results = [];
      return;
    }

    // demo mock results (replace with real backend call)
    // this.loading = true;
    // setTimeout(() => {
    //   this.results = [
    //     { title: `${this.query} — Device A`, subtitle: 'Location: Magazyn' },
    //     { title: `${this.query} — Device B`, subtitle: 'Location: Biuro' },
    //   ];
    //   this.loading = false;
    // }, 450);

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
