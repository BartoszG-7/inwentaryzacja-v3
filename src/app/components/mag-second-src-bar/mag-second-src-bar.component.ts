import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mag-second-src-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mag-second-src-bar.component.html',
  styleUrls: ['./mag-second-src-bar.component.scss']
})
export class MagSecondSrcBar {
  showModal = false;
  term = '';
  search = output<string>();
  open(){ this.showModal = true; }
  close(){ this.showModal = false; }
  submit(){ this.search.emit(this.term); this.close(); }
  clear(input: HTMLInputElement){ this.term=''; input.value=''; this.search.emit(''); }
}
