import { Attribute, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'view-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heading.component.html',
})
export class HeadingComponent {
  icon = input<string>('');
  title = input<string>('');

  constructor(@Attribute('styleClasses') public styleClasses: string) {
  }
}
