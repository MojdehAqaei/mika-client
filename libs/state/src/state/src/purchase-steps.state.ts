import { signal, WritableSignal } from "@angular/core";
import { OrderModel, PurchaseStepsItemModel, PurchaseStepsModel } from "@domain/lib/purchase-and-orders";
import { Crud } from "@view/lib/data-types";
import { SelectItem } from "@view/lib/models";

export interface PurchaseStepsState {
  readonly purchaseStepsList$: WritableSignal<PurchaseStepsModel[]>,
  readonly purchaseStepsItemList$: WritableSignal<PurchaseStepsItemModel[]>,
  readonly selectedPurchaseSteps$: WritableSignal<PurchaseStepsModel>,
  readonly orderList$: WritableSignal<SelectItem<OrderModel>[]>,
  readonly purchaseStepTypeList$: WritableSignal<SelectItem[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
  readonly searchFilterLabels$: WritableSignal<string[]>,
}

export const purchaseStepsInitialState: PurchaseStepsState = {
  purchaseStepsList$: signal<PurchaseStepsModel[]>([]),
  purchaseStepsItemList$: signal<PurchaseStepsItemModel[]>([]),
  purchaseStepTypeList$: signal<SelectItem[]>([]),
  selectedPurchaseSteps$: signal<PurchaseStepsModel>({}),
  orderList$: signal<SelectItem<OrderModel>[]>([]),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([]),
  searchFilterLabels$: signal<string[]>([]),
} as const
