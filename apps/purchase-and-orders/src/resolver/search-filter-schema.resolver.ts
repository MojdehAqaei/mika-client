import { HttpContext, HttpParams } from '@angular/common/http';
import { effect, inject, signal, untracked } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import {
  deliveryStateOptions,
  goodsDeliveryFilterDataMapper,
  invoiceReturnFilterDataMapper,
  invoiceReturnTypeOptions,
  orderFilterDataMapper,
  orderStateOptions,
  orderTypeOptions,
  purchaseInvoiceFilterDataMapper,
  purchaseInvoiceTypeOptions,
  purchaseMethodOptions,
  purchaseScaleOptions,
  purchaseStepsFilterDataMapper,
  purchaseStepsStateOptions,
  purchaseStepsTypeOptions,
  supplyMethodOptions
} from '@domain/lib/purchase-and-orders';
import { TranslateService } from '@ngx-translate/core';
import { ClFormControlTypes } from '@sadad/component-lib/src/enums';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ClFormControlSchema } from '@sadad/component-lib/src/models';
import { ApplicationRoutes } from '@view/lib/data-types';
import { organizationContainTypes } from '../services/deliverer-receiver/deliverer-receiver.service';


const deliverer = signal<string>('');
const receiver = signal<string>('');
const receiverType = signal<string>('');

export const searchFilterSchemaResolver: ResolveFn<ClFormControlSchema[]> = (_: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClFormControlSchema[] => {
  let filterScheme: ClFormControlSchema[] = [];
  const url = state.url.split('/').reverse()[0]?.split('?')[0];

  const translate = inject(TranslateService);

  switch (url) {
    case ApplicationRoutes.goodsDelivery:
      goodsDeliveryFilterDataMapper.set('autoGeneratedCode', translate.instant('purchase-and-orders.goods-delivery.code'))
        .set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))
        .set('fromDate', translate.instant('from-date'))
        .set('toDate', translate.instant('to-date'))
        .set('delivererId', translate.instant('purchase-and-orders.goods-delivery.deliverer'))
        .set('receiverId', translate.instant('purchase-and-orders.goods-delivery.receiver'))
        .set('state', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('purchase-and-orders.goods-delivery.code'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('from-date'),
          name: 'fromDate',
          hasClear: true,
          controlType: ClFormControlTypes.DATEPICKER,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('to-date'),
          name: 'toDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('purchase-and-orders.goods-delivery.deliverer-type'),
          name: 'delivererType',
          options: [
            { content: translate.instant('base-data.person-company.'), value: 'prs-corps', action: () => { deliverer.set('prs-corps') } },
            { content: translate.instant('stockroom.'), value: 'inventories', action: () => { deliverer.set('inventories') } },
            { content: translate.instant('organization'), value: 'organizations', action: () => { deliverer.set('organizations') } },
          ],
          separate: true,
          controlType: ClFormControlTypes.SELECT_BUTTON,
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('purchase-and-orders.goods-delivery.deliverer'),
          name: 'delivererId',
          filterable: true,
          lazyFilter: true,
          url: '',
          disabled: true,
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['typeName', 'title', 'name', 'code'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('purchase-and-orders.goods-delivery.receiver-type'),
          name: 'receiverType',
          options: [
            { content: translate.instant('base-data.person-company.'), value: 'prs-corps', action: () => { receiver.set('prs-corps') } },
            { content: translate.instant('stockroom.'), value: 'inventories', action: () => { receiver.set('inventories') } },
            { content: translate.instant('organization'), value: 'organizations', action: () => { receiver.set('organizations') } },
          ],
          separate: true,
          controlType: ClFormControlTypes.SELECT_BUTTON,
          styleClasses: 'col s12 l4'
        },
        {
          order: 7,
          label: translate.instant('purchase-and-orders.goods-delivery.receiver'),
          name: 'receiverId',
          filterable: true,
          lazyFilter: true,
          url: '',
          disabled: true,
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['typeName', 'title', 'name', 'code'],
          optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 8,
          label: translate.instant('status'),
          name: 'state',
          options: deliveryStateOptions,
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        }
      ];

      effect(() => {
        const d = deliverer();
        const r = receiver();

        // to keep track of 'deliverer' and 'receiver' changes
        untracked(() => {
          const delivererUrl = d ? (d === 'organizations' ? `${d}/search/actives/${organizationContainTypes}/` : `${d}/search/actives`) : '';
          const receiverUrl = r ? (r === 'organizations' ? `${r}/search/actives/${organizationContainTypes}/` : `${r}/search/actives`) : '';

          const delivererField = filterScheme.find(f => f.name === 'delivererId');
          if (delivererField) {
            delivererField.url = delivererUrl;
            delivererField.disabled = !delivererUrl;
          }

          const receiverField = filterScheme.find(f => f.name === 'receiverId');
          if (receiverField) {
            receiverField.url = receiverUrl;
            receiverField.disabled = !receiverUrl;
          }
        });
      });
      break;
    case ApplicationRoutes.purchaseInvoice:
      purchaseInvoiceFilterDataMapper
        .set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))
        .set('autoGeneratedCode', translate.instant('purchase-and-orders.invoice.invoice-code'))
        .set('fromDate', translate.instant('from-date'))
        .set('toDate', translate.instant('to-date'))
        .set('seller', translate.instant('purchase-and-orders.invoice.seller-name'))
        .set('state', translate.instant('status'))
        .set('invoiceNumber', translate.instant('purchase-and-orders.invoice.seller-invoice-code'))
        .set('orderAutoGeneratedCode', translate.instant('purchase-and-orders.invoice.order-code'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('purchase-and-orders.invoice.invoice-code'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('from-date'),
          name: 'fromDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('to-date'),
          name: 'toDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('purchase-and-orders.invoice.seller-name'),
          name: 'seller',
          controlType: ClFormControlTypes.SELECT,
          optionLabel: ['title'],
          url: "prs-corps/search/actives",
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          filterable: true,
          lazyFilter: true,
          filterPlaceholder: translate.instant('purchase-and-orders.invoice.seller-name'),
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('status'),
          name: 'state',
          options: purchaseInvoiceTypeOptions as { label: string; value: string }[],
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('purchase-and-orders.invoice.seller-invoice-code'),
          name: 'invoiceNumber',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 7,
          label: translate.instant('purchase-and-orders.invoice.order-code'),
          name: 'orderAutoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
      ];
      break;
    case ApplicationRoutes.order:
      orderFilterDataMapper
        .set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))
        .set('autoGeneratedCode', translate.instant('purchase-and-orders.order.code'))
        .set('fromDate', translate.instant('from-date'))
        .set('toDate', translate.instant('to-date'))
        .set('orderType', translate.instant('purchase-and-orders.order.type'))
        .set('supplyMethod', translate.instant('purchase-and-orders.order.agent'))
        .set('agent', translate.instant('purchase-and-orders.order.agent'))
        .set('state', translate.instant('status'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('purchase-and-orders.order.code'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('from-date'),
          name: 'fromDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('to-date'),
          name: 'toDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('purchase-and-orders.order.type'),
          name: 'orderType',
          options: orderTypeOptions,
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('purchase-and-orders.order.supply-method'),
          name: 'supplyMethod',
          options: supplyMethodOptions,
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('purchase-and-orders.order.agent'),
          name: 'agent',
          filterable: true,
          lazyFilter: true,
          url: 'users/search/actives/org-role',
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          optionLabel: ['firstName', 'lastName'],
          // optionValue: 'id',
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 7,
          label: translate.instant('status'),
          name: 'state',
          options: orderStateOptions,
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        }
      ];
      break;
    case ApplicationRoutes.invoiceReturn:
      invoiceReturnFilterDataMapper
        .set('fiscalYearId', translate.instant('stockroom.fiscal-year.'))
        .set('autoGeneratedCode', translate.instant('purchase-and-orders.invoice.invoice-code'))
        .set('fromDate', translate.instant('from-date'))
        .set('toDate', translate.instant('to-date'))
        .set('seller', translate.instant('purchase-and-orders.invoice.seller-name'))
        .set('state', translate.instant('status'))
        .set('invoiceNumber', translate.instant('purchase-and-orders.invoice.seller-invoice-code'))
        .set('purchaseInvoiceAutoGeneratedCode', translate.instant('purchase-and-orders.invoice.seller-invoice-code'))

      filterScheme = [
        {
          order: 1,
          label: translate.instant('purchase-and-orders.invoice-return.document-number'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('from-date'),
          name: 'fromDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('to-date'),
          name: 'toDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('purchase-and-orders.invoice.seller-name'),
          name: 'seller.id',
          controlType: ClFormControlTypes.SELECT,
          optionLabel: ['title'],
          url: "prs-corps/search/actives",
          httpContext: new HttpContext().set(SKIP_LOADING, true),
          params: new HttpParams(),
          filterable: true,
          lazyFilter: true,
          filterPlaceholder: translate.instant('purchase-and-orders.invoice.seller-name'),
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('status'),
          name: 'state',
          options: invoiceReturnTypeOptions as { label: string; value: string }[],
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('purchase-and-orders.invoice.seller-invoice-code'),
          name: 'invoiceNumber',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 7,
          label: translate.instant('purchase-and-orders.invoice.document-number'),
          name: 'purchaseInvoiceAutoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
      ];
      break;

    case ApplicationRoutes.purchaseSteps:
      purchaseStepsFilterDataMapper
        .set('autoGeneratedCode', translate.instant('purchase-and-orders.purchase-steps.code'))
        .set('fromDate', translate.instant('from-date'))
        .set('toDate', translate.instant('to-date'))
        .set('purchaseScale', translate.instant('purchase-and-orders.purchase-steps.purchase-scale'))
        .set('purchaseMethod', translate.instant('purchase-and-orders.purchase-steps.purchase-method'))
        .set('purchaseStepType', translate.instant('purchase-and-orders.purchase-steps.purchase-type'))
        .set('order', translate.instant('purchase-and-orders.invoice.order-code'));

      filterScheme = [
        {
          order: 1,
          label: translate.instant('purchase-and-orders.purchase-steps.code'),
          name: 'autoGeneratedCode',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 2,
          label: translate.instant('from-date'),
          name: 'fromDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 3,
          label: translate.instant('to-date'),
          name: 'toDate',
          controlType: ClFormControlTypes.DATEPICKER,
          hasClear: true,
          styleClasses: 'col s12 l4'
        },
        {
          order: 4,
          label: translate.instant('purchase-and-orders.purchase-steps.purchase-scale'),
          name: 'purchaseScale',
          options: purchaseScaleOptions,
          controlType: ClFormControlTypes.SELECT,
          filterPlaceholder: translate.instant('purchase-and-orders.purchase-steps.purchase-scale'),
          styleClasses: 'col s12 l4'
        },
        {
          order: 5,
          label: translate.instant('purchase-and-orders.purchase-steps.purchase-method'),
          name: 'purchaseScale',
          options: purchaseMethodOptions,
          controlType: ClFormControlTypes.SELECT,
          filterPlaceholder: translate.instant('purchase-and-orders.purchase-steps.purchase-method'),
          styleClasses: 'col s12 l4'
        },
        {
          order: 6,
          label: translate.instant('purchase-and-orders.purchase-steps.purchase-type'),
          name: 'purchaseScale',
          options: purchaseStepsTypeOptions,
          controlType: ClFormControlTypes.SELECT,
          filterPlaceholder: translate.instant('purchase-and-orders.purchase-steps.purchase-type'),
          styleClasses: 'col s12 l4'
        },
        {
          order: 7,
          label: translate.instant('status'),
          name: 'state',
          options: purchaseStepsStateOptions as { label: string; value: string }[],
          controlType: ClFormControlTypes.SELECT,
          styleClasses: 'col s12 l4'
        },
        {
          order: 8,
          label: translate.instant('purchase-and-orders.invoice.order-code'),
          name: 'invoiceNumber',
          controlType: ClFormControlTypes.INPUT_TEXT,
          styleClasses: 'col s12 l4'
        },
      ];
      break;
    default:
      //
      break;
  }
  return filterScheme;
};
