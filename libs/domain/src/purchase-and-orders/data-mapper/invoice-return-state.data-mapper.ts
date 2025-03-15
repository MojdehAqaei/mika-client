import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { InvoiceReturnStateEnum } from '../enum/invoice-return-state.enum';

export const invoiceReturnStateDataMapper = new Map<InvoiceReturnStateEnum, string>(
  [
    [InvoiceReturnStateEnum.INITIAL_SUBMIT_INVOICE_RETURN, 'ثبت اولیه'],
    [InvoiceReturnStateEnum.WAIT_FOR_DELIVERY_INVOICE_RETURN, 'در انتظار برگشت تحویل'],
    [InvoiceReturnStateEnum.WAIT_FOR_PAYMENT_RETURN, 'در انتظار برگشت پرداخت'],
    [InvoiceReturnStateEnum.PAID_RETURN, 'پرداخت برگشت شده'],
    [InvoiceReturnStateEnum.CANCEL_INVOICE_RETURN, 'ابطال شده'],
  ]
);
export const INVOICE_RETURN_TYPE = new InjectionToken<ClSelectItem[]>('Invoice Return Type');
export const invoiceReturnTypeOptions: ClSelectItem[] = Object.keys(
  InvoiceReturnStateEnum
).map((each) => {
  return {
    value: each,
    label: invoiceReturnStateDataMapper.get(each as InvoiceReturnStateEnum),
  };
});
