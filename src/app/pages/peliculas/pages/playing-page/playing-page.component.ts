import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-playing-page',
  imports: [],
  template: `<p>playing-page works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayingPageComponent { }
