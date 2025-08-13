import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lokalizacje-right-project',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './lokalizacje-right-project.component.html',
  styleUrl: './lokalizacje-right-project.component.scss'
})
export class LokalizacjeRightProjectComponent {
  @Input() selectedId: any;
}
