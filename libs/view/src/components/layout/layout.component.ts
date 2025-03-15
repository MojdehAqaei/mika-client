import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClBreadcrumbComponent } from '@sadad/component-lib/src/lib/breadcrumb';
import { ClMenuItem } from '@sadad/component-lib/src/models';

@Component({
  selector: 'view-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FavouritesComponent,
    SidebarComponent,
    ClBreadcrumbComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menu: InputSignal<ClMenuItem[]> = input<ClMenuItem[]>([]);
  user: InputSignal<any> = input<any>(); // UserRoleModel
  fiscalPeriod: InputSignal<any> = input<any>(); // FiscalYearModel
  selectedUserRoles: InputSignal<any[]> = input<any[]>([]); // RoleModel
  selectableFiscalPeriods: InputSignal<any[]> = input<any[]>([]); // FiscalYearModel
  showBreadcrumb: InputSignal<boolean> = input<boolean>(true);
  isMenuExpandedOnPageLoad: InputSignal<boolean> = input<boolean>(true);
  logout: OutputEmitterRef<null> = output();
  changeUserRole: OutputEmitterRef<number> = output();
  changeActiveFiscalPeriod: OutputEmitterRef<number> = output();
}
