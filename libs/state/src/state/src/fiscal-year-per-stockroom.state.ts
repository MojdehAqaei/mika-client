import { signal, WritableSignal } from '@angular/core';
import { FiscalYearPerStockroomModel } from '@domain/lib/stockroom';
import { Crud } from "@view/lib/data-types";


export interface FiscalYearPerStockroomState {
  readonly fiscalYearPerStockroomList$: WritableSignal<FiscalYearPerStockroomModel[]>,
  readonly selectedFiscalYearPerStockroom$: WritableSignal<FiscalYearPerStockroomModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const fiscalYearPerStockroomStateInitialState: FiscalYearPerStockroomState = {
  fiscalYearPerStockroomList$: signal<FiscalYearPerStockroomModel[]>([]),
  selectedFiscalYearPerStockroom$: signal<FiscalYearPerStockroomModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  editMode$: signal<boolean>(false),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  allowedActions$: signal<(Crud | undefined)[]>([])
}
