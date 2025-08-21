import { Component, input, InputSignal, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MagazynRightSecondService } from './magazyn-right-second.service';

@Component({
  selector: 'app-magazyn-right-second',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './magazyn-right-second.component.html',
  styleUrls: ['./magazyn-right-second.component.scss'],
})
export class MagazynRightSecond implements OnInit {
  constructor(private magazynRightSecondService: MagazynRightSecondService) {}
  title: InputSignal<string> = input<string>('Monitor 21');
  total: InputSignal<number> = input<number>(71);
  data: any;
  filteredDevices: any[] = [];
  id = input<string>();
  sztItems: InputSignal<number[]> = input<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  ngOnInit(): void {
    console.log(this.id());
    this.magazynRightSecondService.getDevices(this.id()).subscribe({
      next: (value) => {
        console.log(value);
        this.data = value;
        this.filteredDevices = value?.device ?? [];
      },
    });
  }
  tags: InputSignal<string[]> = input<string[]>([
    'tag1',
    'tag2',
    'tag3',
    'tag4',
    'tag5',
    'tag6',
    'tag7',
    'tag8',
    'tag9',
    'tag10',
    'tag11',
    'tag12',
  ]);

  onSearch(term: string) {
    const t = term?.toLowerCase() || '';
    if (!this.data?.device) { this.filteredDevices = []; return; }
    if (!t) { this.filteredDevices = this.data.device; return; }
    this.filteredDevices = this.data.device.filter((d: any) => {
      return [d.serialNr, d.przesylkaNr, d.note, d.wamaNr]
        .some(v => (v || '').toString().toLowerCase().includes(t));
    });
  }
}
