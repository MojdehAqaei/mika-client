import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { InvoiceStateEnum } from '../enum/invoice-state.enum';

export const purchaseInvoiceStateDataMapper = new Map<InvoiceStateEnum, string>(
  [
    [InvoiceStateEnum.INITIAL_SUBMIT_INVOICE, 'ثبت اولیه'],
    [InvoiceStateEnum.WAIT_FOR_DELIVERY_INVOICE, 'در انتظار تحویل'],
    [InvoiceStateEnum.WAIT_FOR_PAYMENT, 'در انتظار پرداخت'],
    [InvoiceStateEnum.PAID, 'پرداخت شده'],
    [InvoiceStateEnum.CANCEL_INVOICE, 'ابطال شده'],
  ]
);
export const PURCHASE_INVOICE_TYPE = new InjectionToken<ClSelectItem[]>('Purchase Invoice Type');
export const purchaseInvoiceTypeOptions: ClSelectItem[] = Object.keys(
  InvoiceStateEnum
).map((each) => {
  return {
    value: each,
    label: purchaseInvoiceStateDataMapper.get(each as InvoiceStateEnum),
  };
});
