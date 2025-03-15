import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClLoadingComponent } from "@sadad/component-lib/src/lib/loading";
import { ScrollTopBottomComponent } from "@sadad/component-lib/src/lib/scroll-top-bottom";
import { ClUserInactivityDirective } from "@sadad/component-lib/src/lib/user-inactivity";
import {
  UserGateway,
  updateLoggedInUserRoleUseCaseProvider,
  userLogoutUseCaseProvider,
  RoleGateway,
  getUserRolesByNationalNumberUseCaseProvider
} from '@domain/lib/user-management';
import { FiscalYearGateway } from '@domain/lib/stockroom';
import { FiscalYearImplementationService, RoleImplementationService, UserImplementationService } from '@api/lib/impl';
import { AppFacade } from '@state/lib/facade';
import { filter } from 'rxjs/operators';
import { DockComponent, LayoutComponent, PageComponent } from '@view/lib/components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClAction } from '@sadad/component-lib/src/models';
import { ApplicationRoutes } from '@view/lib/data-types';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ClLoadingComponent,
    ScrollTopBottomComponent,
    ClUserInactivityDirective,
    DockComponent,
    PageComponent,
    LayoutComponent,
    TranslateModule
  ],
  selector: 'inv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    AppFacade,
    { provide: UserGateway, useClass: UserImplementationService },
    { provide: RoleGateway, useClass: RoleImplementationService },
    { provide: FiscalYearGateway, useClass: FiscalYearImplementationService },
    getUserRolesByNationalNumberUseCaseProvider,
    userLogoutUseCaseProvider,
    updateLoggedInUserRoleUseCaseProvider,
  ]
})
export class AppComponent {
  // injection
  readonly appFacade = inject(AppFacade);
  readonly #router = inject(Router);

  showUserRoleDialog: boolean = false;
  showBreadcrumb!: boolean;

  dockItems: ClAction[] = [
    {
      type: 'icon',
      index: 1,
      icon: 'admin_panel_settings',
      command: () => { this.showUserRoleDialog = true }
    }
  ];

  constructor() {
    this.#router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      takeUntilDestroyed()
    ).subscribe(r => {
      if ((r as ActivationEnd).snapshot.component) {
        this.showBreadcrumb = !(r as ActivationEnd).snapshot.url[0].path?.includes(ApplicationRoutes.home);
        this.appFacade.updateMetaData((r as ActivationEnd).snapshot.data);
      }
    });

    if (this.appFacade.appStore.state$().loggedInUser$()?.userNationalNumber) {
      this.appFacade.getLoggedInUserRoles(this.appFacade.appStore.state$().loggedInUser$()?.userNationalNumber);
    }
  }

  logout() {
    this.appFacade.logout();
  }

  changeUserRole(roleId: number) {
    this.appFacade.updateLoggedInUserRole(roleId);
  }

  changeActiveFiscalYear(fiscalId: number) {
    this.appFacade.updateActiveFiscalPeriod(fiscalId);
  }

  setIdle() {
    this.appFacade.updateIdleState(true);
  }
}
