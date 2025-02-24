import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-popular-page',
  imports: [],
  template: `<p>popular-page works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularPageComponent { }
