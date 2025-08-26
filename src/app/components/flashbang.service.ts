import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface FlashbangOptions {
  duration?: number; // ms
  intensity?: number; // 0..1 - affects opacity and blur
  color?: string; // CSS color for the flash (default: white)
  sound?: boolean; // whether to play a short burst
}

@Injectable({ providedIn: 'root' })
export class FlashbangService {
  private triggerSubject = new Subject<FlashbangOptions | null>();
  trigger$ = this.triggerSubject.asObservable();

  /**
   * Trigger a flashbang effect.
   * Returns a Promise that resolves when the flash is finished.
   */
  trigger(options: FlashbangOptions = {}): Promise<void> {
    const opts: FlashbangOptions = {
      duration: 1000,
      intensity: 0.9,
      color: '#ffffff',
      sound: true,
      ...options,
    };

    return new Promise((resolve) => {
      // send options to overlay component
      this.triggerSubject.next(opts);

      // component will send a "done" event by sending null after animation
      // optionally the component could listen for duration and call resolve itself via another channel
      // we'll also auto-resolve after duration + small buffer
      setTimeout(() => resolve(), (opts.duration ?? 1000) + 50);
    });
  }
}
