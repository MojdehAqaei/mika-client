import { signal, WritableSignal } from "@angular/core";
import { PurchaseInvoiceItemModel, PurchaseInvoiceModel } from "@domain/lib/purchase-and-orders";
import { ClSelectItem } from "@sadad/component-lib/src/models";
import { Crud } from "@view/lib/data-types";

export interface PurchaseInvoiceState {
    readonly invoiceList$: WritableSignal<PurchaseInvoiceModel[]>,
    readonly selectedInvoice$: WritableSignal<PurchaseInvoiceModel>,
    readonly selectedInvoiceItem$: WritableSignal<PurchaseInvoiceItemModel>
    readonly pageNumber$: WritableSignal<number>,
    readonly pageSize$: WritableSignal<number>,
    readonly total$: WritableSignal<number>,
    readonly editMode$: WritableSignal<boolean>,
    readonly dialogLoading$: WritableSignal<boolean>,
    readonly dialogVisible$: WritableSignal<boolean>,
    readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
    readonly searchFilterLabels$: WritableSignal<string[]>,
    readonly orderList$: WritableSignal<ClSelectItem[]>,
}

export const purchaseInvoiceInitialState: PurchaseInvoiceState = {
    invoiceList$: signal<PurchaseInvoiceModel[]>([]),
    selectedInvoice$: signal<PurchaseInvoiceModel>({}),
    selectedInvoiceItem$: signal<PurchaseInvoiceItemModel>({}),
    pageNumber$: signal<number>(0),
    pageSize$: signal<number>(10),
    total$: signal<number>(0),
    editMode$: signal<boolean>(false),
    dialogLoading$: signal<boolean>(false),
    dialogVisible$: signal<boolean>(false),
    allowedActions$: signal<(Crud | undefined)[]>([]),
    searchFilterLabels$: signal<string[]>([]),
    orderList$: signal<ClSelectItem[]>([]),
} as const
