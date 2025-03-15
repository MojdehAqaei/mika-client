import { Route } from '@angular/router';
import { PermissionNames } from '@domain/lib/user-management';
import { baseGuard } from '@inventory/guard/base.guard';
import { AttachmentStore, GoodsDeliveryStore, InvoiceReturnStore, OrderStore, PriceEstimateStore, PurchaseStepsStore } from '@state/lib/store';
import { ApplicationRoutes } from '@view/lib/data-types';
import { Metadata } from '@view/lib/models';
import { PurchaseInvoiceStore } from 'libs/state/src/store/src/purchase-invoice.store';
import { searchFilterSchemaResolver } from '../../resolver/search-filter-schema.resolver';
import { GoodsDeliveryComponent } from '../goods-delivery/goods-delivery.component';
import { InvoiceReturnComponent } from '../invoice-return/invoice-return.component';
import { OrderComponent } from '../order/order.component';
import { PurchaseInvoiceComponent } from '../purchase-invoice/purchase-invoice.component';
import { PurchaseStepsComponent } from '../purchase-steps/purchase-steps.component';

export const remoteRoutes: Route[] = [
  {
    path: ApplicationRoutes.goodsDelivery,
    data: {
      permissionKey: PermissionNames.delivery,
      title: 'خرید و سفارشات',
      breadcrumb: 'تحویل کالا',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'تحویل کالا',
    } as Metadata,
    component: GoodsDeliveryComponent,
    providers: [GoodsDeliveryStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard],
  },
  {
    path: ApplicationRoutes.purchaseInvoice,
    data: {
      permissionKey: PermissionNames.purchase,
      title: 'خرید و سفارشات',
      breadcrumb: 'فاکتور خرید',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'فاکتور خرید',
    } as Metadata,
    component: PurchaseInvoiceComponent,
    providers: [PurchaseInvoiceStore, AttachmentStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard],
  },
  {
    path: ApplicationRoutes.order,
    data: {
      permissionKey: PermissionNames.goodsServiceOrder,
      title: 'سفارش و سفارشات',
      breadcrumb: 'سفارش کالا و خدمات',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'سفارش کالا و خدمات',
    } as Metadata,
    component: OrderComponent,
    providers: [OrderStore, AttachmentStore, PriceEstimateStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard],
  },
  {
    path: ApplicationRoutes.purchaseSteps,
    data: {
      permissionKey: PermissionNames.PurchaseReference,
      title: 'خرید و سفارشات',
      breadcrumb: 'مراحل خرید',
      hasDrawer: false,
      isMenuExpanded: false,
      pageTitle: 'مراحل خرید',
    } as Metadata,
    component: PurchaseStepsComponent,
    resolve: { formSchema: searchFilterSchemaResolver },
    providers: [PurchaseStepsStore, AttachmentStore],
    canActivate: [baseGuard],
  },
  {
    path: ApplicationRoutes.invoiceReturn,
    data: {
      permissionKey: PermissionNames.purchaseReturn,
      title: 'خرید و سفارشات',
      breadcrumb: 'فاکتور برگشت از خرید',
      hasDrawer: false,
      pageTitle: 'فاکتور برگشت از خرید',
    } as Metadata,
    component: InvoiceReturnComponent,
    providers: [InvoiceReturnStore, AttachmentStore],
    resolve: { formSchema: searchFilterSchemaResolver },
    canActivate: [baseGuard],
  },
];
