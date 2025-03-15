import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClMessage } from '@sadad/component-lib/src/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'view-announcement',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
})
export class AnnouncementComponent {
  @Input() data!: ClMessage;
}
