import { signal, WritableSignal } from "@angular/core";
import { InvoiceReturnItemModel, InvoiceReturnModel } from "@domain/lib/purchase-and-orders";
import { ClSelectItem } from "@sadad/component-lib/src/models";
import { Crud } from "@view/lib/data-types";

export interface InvoiceReturnState {
  readonly invoiceReturnList$: WritableSignal<InvoiceReturnModel[]>,
  readonly selectedInvoiceReturn$: WritableSignal<InvoiceReturnModel>,
  readonly selectedInvoiceItem$: WritableSignal<InvoiceReturnItemModel>
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly PurchaseInvoiceList$: WritableSignal<ClSelectItem[]>,
  readonly purchaseInvoiceItems$: WritableSignal<ClSelectItem[]>,
}

export const InvoiceReturnInitialState: InvoiceReturnState = {
  invoiceReturnList$: signal<InvoiceReturnModel[]>([]),
  selectedInvoiceReturn$: signal<InvoiceReturnModel>({}),
  selectedInvoiceItem$: signal<InvoiceReturnItemModel>({}),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([]),
  searchFilterLabels$: signal<string[]>([]),
  PurchaseInvoiceList$: signal<ClSelectItem[]>([]),
  purchaseInvoiceItems$: signal<ClSelectItem[]>([]),
} as const
