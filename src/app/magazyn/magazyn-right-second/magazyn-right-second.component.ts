import { Component, input, InputSignal, OnInit } from '@angular/core';
import { MagazynRightSecondService } from './magazyn-right-second.service';

@Component({
  selector: 'app-magazyn-right-second',
  standalone: true,
  imports: [],
  templateUrl: './magazyn-right-second.component.html',
  styleUrls: ['./magazyn-right-second.component.scss'],
})
export class MagazynRightSecond implements OnInit {
  constructor(private magazynRightSecondService: MagazynRightSecondService) {}
  title: InputSignal<string> = input<string>('Monitor 21');
  total: InputSignal<number> = input<number>(71);
  data: any;
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
}
