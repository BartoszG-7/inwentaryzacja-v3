// FILE: flashbang.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { FlashbangService, FlashbangOptions } from './flashbang.service';

@Component({
  selector: 'app-flashbang',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="visible"
      class="flash-overlay"
      [style.background]="options?.color || '#fff'"
      [style.opacity]="opacity"
      [style.backdropFilter]="backdrop"
      aria-hidden="true"
    ></div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9999;
      }
      .flash-overlay {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        transition: opacity 300ms ease-out;
        will-change: opacity, backdrop-filter;
        mix-blend-mode: normal;
      }
    `,
  ],
})
export class FlashbangComponent implements OnInit, OnDestroy {
  visible = false;
  options: FlashbangOptions | null = null;
  opacity = '0';
  backdrop = 'none';

  private sub?: Subscription;
  private audioCtx?: AudioContext | null;

  constructor(private fb: FlashbangService) {}

  ngOnInit() {
    this.sub = this.fb.trigger$.subscribe((opts) => {
      if (!opts) return;
      this.play(opts);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.stopAudio();
  }

  private async play(opts: FlashbangOptions) {
    this.options = opts;
    const duration = opts.duration ?? 1000;
    const intensity = Math.max(0, Math.min(1, opts.intensity ?? 1));

    // compute CSS values
    this.opacity = String(0);
    this.visible = true;

    // small timed steps to simulate a quick bright flash then fade
    // Phase 1: instant bright flash
    requestAnimationFrame(() => {
      this.opacity = String(0.95 * intensity);
      // backdrop filter for blur/bloom effect
      const blurPx = 6 + intensity * 24; // 6..30px
      this.backdrop = `blur(${blurPx}px) brightness(${1 + intensity * 0.6})`;
    });

    // optionally play sound
    if (opts.sound) {
      this.playSound(intensity);
    }

    // Fade out
    const fadeDelay = Math.max(80, duration * 0.12);
    const fadeTime = Math.max(200, duration - fadeDelay);

    // after a small hold, fade out opacity
    timer(fadeDelay).subscribe(() => {
      this.opacity = '0';
      // remove backdrop gradually
      setTimeout(() => (this.backdrop = 'none'), fadeTime);
    });

    // hide component when finished
    timer(duration).subscribe(() => {
      this.visible = false;
      this.options = null;
    });
  }

  private playSound(intensity: number) {
    try {
      const audio = new Audio();
      audio.src =
        'https://www.myinstants.com/media/sounds/flashbang-cs_qoRhxLn.mp3';
      audio.volume = 0.01
      audio.play();
      // const AC = window.AudioContext || (window as any).webkitAudioContext;
      // this.audioCtx = new AC();
      // const ctx = this.audioCtx;
      // const gain = ctx.createGain();
      // const osc = ctx.createOscillator();

      // // quick frequency sweep to give a short "pop".
      // const now = ctx.currentTime;
      // osc.type = 'sine';
      // const startFreq = 1800;
      // const endFreq = 400;
      // osc.frequency.setValueAtTime(startFreq, now);
      // osc.frequency.exponentialRampToValueAtTime(
      //   endFreq,
      //   now + 0.08 + intensity * 0.04
      // );

      // // gain envelope
      // gain.gain.setValueAtTime(0.0001, now);
      // gain.gain.exponentialRampToValueAtTime(0.5 * intensity, now + 0.005);
      // gain.gain.exponentialRampToValueAtTime(
      //   0.0001,
      //   now + 0.12 + intensity * 0.06
      // );

      // osc.connect(gain).connect(ctx.destination);
      // osc.start(now);
      // osc.stop(now + 0.14 + intensity * 0.06);

      // // cleanup
      // osc.onended = () => {
      //   try {
      //     gain.disconnect();
      //     osc.disconnect();
      //   } catch (e) {}
      //   // don't close context immediately; small timeout
      //   setTimeout(() => {
      //     try {
      //       ctx.close();
      //     } catch (e) {}
      //   }, 200);
      // };
    } catch (e) {
      // audio not supported or blocked by user gesture
      // fail silently
      console.warn('Flashbang audio not available', e);
    }
  }

  private stopAudio() {
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {}
      this.audioCtx = null;
    }
  }
}

// FILE: usage.md (how to use in your Angular v20 app)
/*
1) Place the FlashbangComponent near the root of your app (so it covers everything). In app.component.ts template:

  <app-flashbang></app-flashbang>

2) Import the component into the root module or if using standalone components, simply add it to your App component's imports:

  import { FlashbangComponent } from './flashbang.component';

  @Component({
    standalone: true,
    imports: [BrowserModule, FlashbangComponent, ...],
    selector: 'app-root',
    template: `
      <app-flashbang></app-flashbang>
      <router-outlet></router-outlet>
    `,
  })
  export class AppComponent {}

3) Inject FlashbangService where you want to trigger the effect:

  constructor(private flash: FlashbangService) {}

  async triggerExample() {
    await this.flash.trigger({ duration: 1200, intensity: 0.95, sound: true, color: '#ffffff' });
    // resolves when finished
  }

Notes & tips:
- The component uses pointer-events: none so it won't block clicks. If you'd rather block input during effect set pointer-events to auto inside the host style.
- Some browsers block audio unless the page has user interaction; if sound doesn't play, rely on the visual effect only.
- Tweak duration and intensity to taste; intensity influences brightness and blur.
*/
