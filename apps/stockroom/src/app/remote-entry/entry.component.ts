import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'stockroom-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
