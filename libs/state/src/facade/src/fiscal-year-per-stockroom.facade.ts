import { inject, Injectable } from '@angular/core';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';

import {
  DeleteFiscalYearPerStockroomUseCase,
  fiscalYearPerStockroomFilterDataMapper,
  FiscalYearPerStockroomModel,
  FiscalYearPerStockroomModelFilter,
  GetFiscalYearPerStockroomListUseCase,
  SaveFiscalYearPerStockroomUseCase,
  UpdateFiscalYearPerStockroomUseCase
} from '@domain/lib/stockroom';
import { FiscalYearPerStockroomStore } from '../../store';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class FiscalYearPerStockroomFacade {
  public fiscalYearPerStockroomStore = inject(FiscalYearPerStockroomStore);

  readonly #getFiscalYearPerStockroomListUseCase = inject(GetFiscalYearPerStockroomListUseCase);
  readonly #saveFiscalYearPerStockroomUseCase = inject(SaveFiscalYearPerStockroomUseCase);
  readonly #updateFiscalYearPerStockroomUseCase = inject(UpdateFiscalYearPerStockroomUseCase);
  readonly #deleteFiscalYearPerStockroomUseCase = inject(DeleteFiscalYearPerStockroomUseCase);


  constructor() {
    this.fiscalYearPerStockroomStore.updatePageNumber(0);
    this.updateFiscalYearPeStockroomList({});
  }

  toggleEditMode(editMode: boolean) {
    this.fiscalYearPerStockroomStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.fiscalYearPerStockroomStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.fiscalYearPerStockroomStore.updatePageSize(pageSize);
    this.fiscalYearPerStockroomStore.updatePageNumber(pageNumber);
  }

  saveFiscalYearPerStockroom(fiscalYear: FiscalYearPerStockroomModel) {
    this.fiscalYearPerStockroomStore.updateDialogLoading(true);
    this.#saveFiscalYearPerStockroomUseCase.execute(fiscalYear).subscribe({
      next: (res) => {

        const total = this.fiscalYearPerStockroomStore.state$().total$();
        const list = this.fiscalYearPerStockroomStore.state$().fiscalYearPerStockroomList$();
        this.fiscalYearPerStockroomStore.updateFiscalYearPerStockroomList([...list, res]);

        this.fiscalYearPerStockroomStore.updateDialogLoading(false);
        this.fiscalYearPerStockroomStore.updateDialogVisibility(false);
        this.fiscalYearPerStockroomStore.updateTotal(total + 1);
      },
      error: () => {
        this.fiscalYearPerStockroomStore.updateDialogLoading(false);
      }
    });
  }

  updateFiscalYearPerStockroom(fiscalYear: FiscalYearPerStockroomModel) {
    this.#updateFiscalYearPerStockroomUseCase.execute(fiscalYear).subscribe(res => {
      const list = this.fiscalYearPerStockroomStore.state$().fiscalYearPerStockroomList$();
      const index = list.findIndex(i => i.id == res.id);
      list.splice(index, 1, res);
      this.fiscalYearPerStockroomStore.updateFiscalYearPerStockroomList([...list]);
    })
  }

  updateSelectedFiscalYear(fiscalYearPerStockroom: FiscalYearPerStockroomModel) {
    this.fiscalYearPerStockroomStore.updateSelectedFiscalYearPerStockroom(fiscalYearPerStockroom);
  }

  @Cache()
  updateFiscalYearPeStockroomList(filters: FiscalYearPerStockroomModel) {
    this.#getFiscalYearPerStockroomListUseCase.execute(filters).subscribe(res => {
      this.fiscalYearPerStockroomStore.updateFiscalYearPerStockroomList(res);
      res?.length && res[0].totalElements ? this.fiscalYearPerStockroomStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as FiscalYearPerStockroomModelFilter] != undefined && fiscalYearPerStockroomFilterDataMapper.has(each as FiscalYearPerStockroomModelFilter)) {
          tmp.push(fiscalYearPerStockroomFilterDataMapper.get(each as FiscalYearPerStockroomModelFilter)|| '');
        }
      })
      this.fiscalYearPerStockroomStore.updateSearchFilterLabels(tmp);
    })
  }

  @ErrorLogger()
  deleteFiscalYear(id: number) {
    this.#deleteFiscalYearPerStockroomUseCase.execute(id).subscribe(() => {

      const total = this.fiscalYearPerStockroomStore.state$().total$();
      const list = this.fiscalYearPerStockroomStore.state$().fiscalYearPerStockroomList$();
      const index = list.findIndex(i => i.id == id);
      this.fiscalYearPerStockroomStore.updateFiscalYearPerStockroomList([...list.slice(0, index), ...list.slice(index + 1)]);
      this.fiscalYearPerStockroomStore.updateTotal(total - 1);
    })
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.fiscalYearPerStockroomStore.updateAllowedActions(actions);
  }
}
