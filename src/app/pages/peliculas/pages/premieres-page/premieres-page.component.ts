import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-premieres-page',
  imports: [],
  template: `<p>premieres-page works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PremieresPageComponent { }
