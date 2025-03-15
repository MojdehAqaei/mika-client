import { InjectionToken } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { TransferAndReceiptStateEnum } from '../enum/transfer-and-receipt-state.enum';

export const transferAndReceiptStateDataMapper = new Map<TransferAndReceiptStateEnum, string>([
  [TransferAndReceiptStateEnum.AUTOMATED_INITIAL_SUBMIT, 'ثبت اولیه سیستمی'],
  [TransferAndReceiptStateEnum.WAITING_FOR_CURRENCY_CONVERSION, 'در انتظار ریالی سازی'],
  [TransferAndReceiptStateEnum.WAITING_FOR_DOCUMENT_ISSUANCE, 'در انتظار صدور سند حسابداری'],
  [TransferAndReceiptStateEnum.CANCELED, 'ابطال شده'],
]);


export const TRANSFER_AND_RECEIPT_STATE = new InjectionToken<ClSelectItem[]>('transfer and receipt state');

export const transferAndReceiptStateOptions: ClSelectItem[] = Object.keys(TransferAndReceiptStateEnum)
  .filter(i => transferAndReceiptStateDataMapper.has(i as TransferAndReceiptStateEnum))
  .map(each => {
    return  {value: each, label: transferAndReceiptStateDataMapper.get(each as TransferAndReceiptStateEnum)};
  });
