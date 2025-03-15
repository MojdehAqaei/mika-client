import { Route } from '@angular/router';
import { ApplicationRoutes } from '@view/lib/data-types';
import {
  AttachmentStore,
  FiscalYearPerStockroomStore,
  FiscalYearStore,
  InventoryTypeStore,
  ReceiptStore,
  StockroomStore,
  TransferStore,
  WarehousingStore
} from '@state/lib/store';
import { Metadata } from '@view/lib/models';
import { searchFilterSchemaResolver } from '../../resolver/search-filter-schema.resolver';
import { baseGuard } from '@inventory/guard/base.guard';
import { PermissionNames } from '@domain/lib/user-management';
import { FiscalYearsComponent } from '../fiscal-years/fiscal-years.component';
import { InventoryTypesComponent } from '../inventory-types/inventory-types.component';
import { StockroomComponent } from '../stockroom/stockroom.component';
import { FiscalYearPerStockroomComponent } from '../fiscal-year-per-stockroom/fiscal-year-per-stockroom.component';
import { ReceiptComponent } from '../receipt/receipt.component';
import { TransferComponent } from '../transfer/transfer.component';
import { WarehousingComponent } from '../warehousing/warehousing.component';

export const remoteRoutes: Route[] = [
  {
    path: ApplicationRoutes.stockroomManagement,
    data: {
      permissionKey: PermissionNames.inventory,
      title: 'مدیریت انبار و مراکز نگهداری',
      breadcrumb: 'انبار و مراکز نگهداری',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'انبار و مراکز نگهداری'
    } as Metadata,
    component: StockroomComponent,
    providers: [StockroomStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.inventoryType,
    data: {
      permissionKey: PermissionNames.inventoryType,
      title: 'مدیریت نوع انبار',
      breadcrumb: 'نوع انبار',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'نوع انبار'
    } as Metadata,
    component: InventoryTypesComponent,
    providers: [InventoryTypeStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.fiscalYear,
    data: {
      permissionKey: PermissionNames.fiscalPeriod,
      title: 'مدیریت دوره‌های مالی',
      breadcrumb: 'دوره مالی',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'دوره مالی'
    } as Metadata,
    component: FiscalYearsComponent,
    providers: [FiscalYearStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.fiscalYearPerStockroom,
    data: {
      permissionKey: PermissionNames.fiscalPeriodStatus,
      title: 'مدیریت دوره‌های مالی',
      breadcrumb: 'تعین وضعیت دوره مالی',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'تعیین وضعیت دوره مالی'
    } as Metadata,
    component: FiscalYearPerStockroomComponent,
    providers: [FiscalYearPerStockroomStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.receipt,
    data: {
      permissionKey: PermissionNames.receipt,
      title: 'انبارداری',
      breadcrumb: 'رسید انبار',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'رسید انبار'
    } as Metadata,
    component: ReceiptComponent,
    providers: [ReceiptStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.transfer,
    data: {
      permissionKey: PermissionNames.transfer,
      title: 'انبارداری',
      breadcrumb: 'حواله انبار',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'حواله انبار'
    } as Metadata,
    component: TransferComponent,
    providers: [TransferStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  },
  {
    path: ApplicationRoutes.warehousing,
    data: {
      permissionKey: PermissionNames.inventoryCounting,
      title: 'انبارداری',
      breadcrumb: 'انبارگردانی',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'انبارگردانی'
    } as Metadata,
    component: WarehousingComponent,
    providers: [WarehousingStore, AttachmentStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard]
  }
];
