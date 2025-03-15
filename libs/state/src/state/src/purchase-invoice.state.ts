import { signal, WritableSignal } from "@angular/core";
import { OrderItemModel, OrderModel, PurchaseInvoiceItemModel, PurchaseInvoiceModel } from "@domain/lib/purchase-and-orders";
import { Crud } from "@view/lib/data-types";
import { SelectItem } from "@view/lib/models";

export interface PurchaseInvoiceState {
  readonly purchaseInvoiceList$: WritableSignal<PurchaseInvoiceModel[]>,
  readonly selectedPurchaseInvoice$: WritableSignal<PurchaseInvoiceModel>,
  readonly selectedInvoiceItem$: WritableSignal<PurchaseInvoiceItemModel>
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly orderList$: WritableSignal<SelectItem<OrderModel>[]>,
  readonly orderItemsPerOrderId$: WritableSignal<SelectItem<OrderItemModel>[]>,
}

export const purchaseInvoiceInitialState: PurchaseInvoiceState = {
  purchaseInvoiceList$: signal<PurchaseInvoiceModel[]>([]),
  selectedPurchaseInvoice$: signal<PurchaseInvoiceModel>({}),
  selectedInvoiceItem$: signal<PurchaseInvoiceItemModel>({}),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([]),
  searchFilterLabels$: signal<string[]>([]),
  orderList$: signal<SelectItem<OrderModel>[]>([]),
  orderItemsPerOrderId$: signal<SelectItem<OrderItemModel>[]>([]),
} as const
