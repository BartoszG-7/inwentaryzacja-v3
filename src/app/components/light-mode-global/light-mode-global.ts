import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-light-mode-global',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './light-mode-global.html',
  styleUrls: ['./light-mode-global.scss']
})
export class LightModeGlobal {
  isLight = false;
  ngOnInit() {
    // initialize state from body class on reloads
    this.isLight = document.body.classList.contains('theme-light');
  }
  toggle(event?: Event) {
    this.isLight = !this.isLight;
    document.body.classList.toggle('theme-light', this.isLight);
    // Remove focus so the hover/focus styles don't persist after click
    const target = (event?.currentTarget || event?.target) as HTMLElement | undefined;
    target?.blur?.();
  }
}
