import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  selector: 'base-data-entry',
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {}
