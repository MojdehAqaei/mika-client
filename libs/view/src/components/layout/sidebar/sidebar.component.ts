import {
  Component,
  Inject,
  inject,
  output,
  InputSignal,
  OutputEmitterRef,
  ViewContainerRef,
  input,
  model,
  ModelSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClMenuItem } from '@sadad/component-lib/src/models';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ClAvatarComponent } from '@sadad/component-lib/src/lib/avatar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClObjectToStringPipe } from '@sadad/component-lib/src/pipes';
import { ClConfirmationService } from '@sadad/component-lib/src/services';
import { ClConfirmation } from '@sadad/component-lib/src/models/confirmation';
import { CONFIRMATION_SERVICE_CONFIG } from '../../../values';

@Component({
  selector: 'view-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ClButtonComponent, TranslateModule, ClAvatarComponent, ClObjectToStringPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('toggleOpen', [
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
      })),
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class SidebarComponent {
  readonly #confirmationService: ClConfirmationService = inject(ClConfirmationService);
  readonly #viewRef: ViewContainerRef = inject(ViewContainerRef);
  readonly #translate: TranslateService = inject(TranslateService);

  user: InputSignal<any> = input<any>();  // UserRoleModel
  menuItems: InputSignal<ClMenuItem[]> = input<ClMenuItem[]>([]);
  isMenuExpandedOnPageLoad: ModelSignal<boolean> = model<boolean>(true);

  logout: OutputEmitterRef<null> = output();

  isUserProfileOpen = false;

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
  }

  logoutUser() {
    this.#confirmationService.confirm(this.#viewRef, {
      ...this.confirmationConfig,
      message: this.#translate.instant('messages.sure-to-logout'),
      accept: () => this.logout.emit(null)
    });
  }
}
