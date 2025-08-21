import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-magazyn-right-second',
  standalone: true,
  imports: [],
  templateUrl: './magazyn-right-second.component.html',
  styleUrls: ['./magazyn-right-second.component.scss']
})
export class MagazynRightSecond {
  title: InputSignal<string> = input<string>('Monitor 21');
  total: InputSignal<number> = input<number>(71);
  sztItems: InputSignal<number[]> = input<number[]>([1,2,3,4,5,6,7,8,9,10,11,12]);
  tags: InputSignal<string[]> = input<string[]>([
    'tag1','tag2','tag3','tag4','tag5','tag6','tag7','tag8','tag9','tag10','tag11','tag12'
  ]);
}
