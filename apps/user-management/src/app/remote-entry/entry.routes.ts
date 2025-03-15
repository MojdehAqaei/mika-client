import { Route } from '@angular/router';
import { ApplicationRoutes } from '@view/lib/data-types';
import { Metadata } from '@view/lib/models';
import { RolesComponent } from '../roles/roles.component';
import { UsersComponent } from '../users/users.component';
import { UserRolesComponent } from '../user-roles/user-roles.component';
import { UsersStore, RolesStore, UserRolesStore } from '@state/lib/store';
import { searchFilterSchemaResolver } from '../../resolver/search-filter-schema.resolver';
import { baseGuard } from '@inventory/guard/base.guard';
import { PermissionNames } from '@domain/lib/user-management';


export const remoteRoutes: Route[] = [
  {
    path: ApplicationRoutes.roles,
    data: {permissionKey: PermissionNames.role, title: 'نقش', breadcrumb: 'نقش', hasDrawer: false, isMenuExpanded: false, pageTitle: 'نقش'} as Metadata,
    component: RolesComponent,
    providers: [RolesStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.users,
    data: {permissionKey: PermissionNames.user, title: 'کاربر', breadcrumb: 'کاربر', hasDrawer: false, isMenuExpanded: false, pageTitle: 'کاربر'} as Metadata,
    component: UsersComponent,
    providers: [UsersStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.userContentAccess,
    data: {permissionKey: PermissionNames.permission, title: 'تخصیص دسترسی', breadcrumb: 'تخصیص دسترسی', hasDrawer: false, isMenuExpanded: false, pageTitle: 'تخصیص دسترسی'} as Metadata,
    component: UserRolesComponent,
    providers: [UserRolesStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  }
];
