import { Route } from '@angular/router';
import { ApplicationRoutes } from '@view/lib/data-types';
import { Metadata } from '@view/lib/models';
import { GoodsGroupComponent } from '../goods-group/goods-group.component';
import { GoodsGroupStore, GoodsStore, CountingUnitStore, FeatureStore, PersonCompanyStore } from '@state/lib/store';
import { CountingUnitsComponent } from '../counting-units/counting-units.component';
import { FeatureComponent } from '../feature/feature.component';
import { GoodsComponent } from '../goods/goods.component';
import { PermissionNames } from '@domain/lib/user-management';
import { PersonCompanyComponent } from '../person-company/person-company.component';
import { SearchFilterSchemaResolver } from '../../resolver/search-filter-schema.resolver';
import { baseGuard } from '@inventory/guard/base.guard';

export const remoteRoutes: Route[] = [
  {
    path: ApplicationRoutes.goodsAndServicesGroup,
    data: {permissionKey: PermissionNames.goodsServiceCategory, title: 'اطلاعات پایه', breadcrumb: 'گروه کالا / خدمات', hasDrawer: false, isMenuExpanded: false, pageTitle: 'گروه کالا / خدمات'} as Metadata,
    component: GoodsGroupComponent,
    providers: [GoodsGroupStore, FeatureStore],
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.unitOfMeasure,
    data: {permissionKey: PermissionNames.measurement, title: 'اطلاعات پایه', breadcrumb: 'واحد شمارش', hasDrawer: false, isMenuExpanded: false, pageTitle: 'واحد شمارش'} as Metadata,
    component: CountingUnitsComponent,
    providers: [CountingUnitStore],
    resolve: {formSchema: SearchFilterSchemaResolver},
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.goodsAndServicesFeatures,
    data: {permissionKey: PermissionNames.goodsServiceProperty, title: 'اطلاعات پایه', breadcrumb: 'ویژگی کالا / خدمات', hasDrawer: false, isMenuExpanded: false, pageTitle: 'ویژگی کالا / خدمات'} as Metadata,
    component: FeatureComponent,
    providers: [FeatureStore],
    resolve: {formSchema: SearchFilterSchemaResolver},
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.goodsAndServices,
    data: {permissionKey: PermissionNames.goodsService, title: 'اطلاعات پایه', breadcrumb: 'کالا / خدمت', hasDrawer: false, isMenuExpanded: false, pageTitle: 'کالا / خدمت'} as Metadata,
    component: GoodsComponent,
    providers: [GoodsStore, GoodsGroupStore],
    resolve: {formSchema: SearchFilterSchemaResolver},
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.personAndCompany,
    data: {permissionKey: PermissionNames.personCompany, title: 'اطلاعات پایه', breadcrumb: 'شخص / شرکت', hasDrawer: false, isMenuExpanded: false, pageTitle: 'شخص / شرکت'} as Metadata,
    component: PersonCompanyComponent,
    providers: [PersonCompanyStore],
    resolve: {formSchema: SearchFilterSchemaResolver},
    canActivate: [baseGuard]
  }
];
