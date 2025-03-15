import { signal, WritableSignal } from '@angular/core';
import { GoodsModel } from '@domain/lib/base-data';
import { Crud } from "@view/lib/data-types";


export interface GoodsState {
  readonly goodsList$: WritableSignal<GoodsModel[]>,
  readonly selectedGoods$: WritableSignal<GoodsModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const goodsInitialState: GoodsState = {
  goodsList$: signal<GoodsModel[]>([]),
  selectedGoods$: signal<GoodsModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  pageNumber$: signal<number>(0),
  total$: signal<number>(0),
  pageSize$: signal<number>(10),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
} as const
