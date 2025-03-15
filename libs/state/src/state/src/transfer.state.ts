import { signal, WritableSignal } from '@angular/core';
import { TransferAndReceiptModel } from '@domain/lib/stockroom';
import { Crud } from '@view/lib/data-types';

export interface TransferState {
  readonly transfers$: WritableSignal<TransferAndReceiptModel[]>,
  readonly selectedTransfer$: WritableSignal<TransferAndReceiptModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const transferInitialState: TransferState = {
  transfers$: signal<TransferAndReceiptModel[]>([]),
  selectedTransfer$: signal<TransferAndReceiptModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  pageNumber$: signal<number>(0),
  total$: signal<number>(0),
  pageSize$: signal<number>(10),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
}
