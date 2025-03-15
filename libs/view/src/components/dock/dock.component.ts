import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClAction } from '@sadad/component-lib/src/models';

@Component({
  selector: 'view-dock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dock.component.html',
  styleUrl: './dock.component.scss',
})
export class DockComponent {
  @Input({required: true}) items!: ClAction[];
}
