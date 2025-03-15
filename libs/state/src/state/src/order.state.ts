import { signal, WritableSignal } from '@angular/core';
import { OrderModel, OrderItemModel } from '@domain/lib/purchase-and-orders';
import { Crud } from "@view/lib/data-types";

export interface OrderState {
  readonly orderList$: WritableSignal<OrderModel[]>,
  readonly selectedOrder$: WritableSignal<OrderModel>,
  readonly selectedOrderItem$: WritableSignal<OrderItemModel>
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
  readonly searchFilterLabels$: WritableSignal<string[]>,
}

export const orderInitialState: OrderState = {
  orderList$: signal<OrderModel[]>([]),
  selectedOrder$: signal<OrderModel>({}),
  selectedOrderItem$: signal<OrderItemModel>({}),
  pageNumber$: signal<number>(1),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([]),
  searchFilterLabels$: signal<string[]>([]),
} as const
