import { signal, WritableSignal } from '@angular/core';
import { GoodsDeliveryModel } from '@domain/lib/purchase-and-orders';
import { Crud } from "@view/lib/data-types";
import { SelectItem } from '@view/lib/models';


export interface GoodsDeliveryState {
  readonly goodsDeliveryList$: WritableSignal<GoodsDeliveryModel[]>,
  readonly selectedGoodsDelivery$: WritableSignal<GoodsDeliveryModel>,
  readonly informaticsSerialNumbers$: WritableSignal<SelectItem[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly isFormStepValid$: WritableSignal<boolean>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
  readonly searchFilterLabels$: WritableSignal<string[]>,
}

export const goodsDeliveryInitialState: GoodsDeliveryState = {
  goodsDeliveryList$: signal<GoodsDeliveryModel[]>([]),
  selectedGoodsDelivery$: signal<GoodsDeliveryModel>({}),
  informaticsSerialNumbers$: signal<SelectItem[]>([]),
  pageNumber$: signal<number>(1),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  isFormStepValid$: signal<boolean>(true),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([]),
  searchFilterLabels$: signal<string[]>([]),
} as const
