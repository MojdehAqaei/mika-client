import { signal, WritableSignal } from '@angular/core';
import { InventoryTypeModel } from '@domain/lib/stockroom';
import { Crud } from "@view/lib/data-types";

export interface InventoryTypeState {
  readonly inventoryTypes$: WritableSignal<InventoryTypeModel[]>,
  readonly selectedInventoryType$: WritableSignal<InventoryTypeModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const inventoryTypeInitialState: InventoryTypeState = {
  inventoryTypes$: signal<InventoryTypeModel[]>([]),
  selectedInventoryType$: signal<InventoryTypeModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  editMode$: signal<boolean>(false),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  allowedActions$: signal<(Crud | undefined)[]>([])
}
