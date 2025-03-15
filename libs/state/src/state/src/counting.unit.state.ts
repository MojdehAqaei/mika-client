import { signal, WritableSignal } from '@angular/core';
import { CountingUnitModel } from '@domain/lib/base-data';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { Crud } from "@view/lib/data-types";

export interface CountingUnitState {
  readonly countingUnits$: WritableSignal<CountingUnitModel[]>,
  readonly countingUnitTypes$: WritableSignal<ClSelectItem[]>,
  readonly selectedCountingUnit$: WritableSignal<CountingUnitModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly editMode$: WritableSignal<boolean>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const countingUnitInitialState: CountingUnitState = {
  countingUnits$: signal<CountingUnitModel[]>([]),
  countingUnitTypes$: signal<ClSelectItem[]>([]),
  selectedCountingUnit$: signal<CountingUnitModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  editMode$: signal<boolean>(false),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
};
