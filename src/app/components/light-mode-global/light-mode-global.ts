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
    // Initialize from sessionStorage first, fallback to body class on reloads
    try {
      const saved = sessionStorage.getItem('theme');
      if (saved === 'light') this.isLight = true;
      else if (saved === 'dark') this.isLight = false;
      else this.isLight = document.body.classList.contains('theme-light');
    } catch {
      this.isLight = document.body.classList.contains('theme-light');
    }
    // Ensure body reflects current state
    document.body.classList.toggle('theme-light', this.isLight);
  }
  toggle(event?: Event) {
    this.isLight = !this.isLight;
    document.body.classList.toggle('theme-light', this.isLight);
    // Persist the choice for the session
    try {
      sessionStorage.setItem('theme', this.isLight ? 'light' : 'dark');
    } catch {}
    // Remove focus so the hover/focus styles don't persist after click
    const target = (event?.currentTarget || event?.target) as HTMLElement | undefined;
    target?.blur?.();
  }
}
