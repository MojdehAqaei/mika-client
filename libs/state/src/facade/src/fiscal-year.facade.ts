import { inject, Injectable } from '@angular/core';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';

import {
  DeleteFiscalYearUseCase,
  fiscalYearFilterDataMapper,
  FiscalYearModel,
  FiscalYearModelFilter,
  GetFiscalYearsUseCase,
  SaveFiscalYearUseCase,
  UpdateFiscalYearUseCase
} from '@domain/lib/stockroom';
import { FiscalYearStore } from '../../store';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class FiscalYearFacade {
  public fiscalYearStore = inject(FiscalYearStore);

  readonly #getFiscalYearsUseCase = inject(GetFiscalYearsUseCase);
  readonly #updateFiscalYearUseCase = inject(UpdateFiscalYearUseCase);
  readonly #deleteFiscalYearUseCase = inject(DeleteFiscalYearUseCase);
  readonly #saveFiscalYearUseCase = inject(SaveFiscalYearUseCase);

  constructor() {
    this.fiscalYearStore.updatePageNumber(0);
    this.updateFiscalYears({});
  }

  toggleEditMode(editMode: boolean) {
    this.fiscalYearStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.fiscalYearStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.fiscalYearStore.updatePageSize(pageSize);
    this.fiscalYearStore.updatePageNumber(pageNumber);
  }

  saveFiscalYear(fiscalYear: FiscalYearModel) {
    this.fiscalYearStore.updateDialogLoading(true);
    this.#saveFiscalYearUseCase.execute(fiscalYear).subscribe({
      next: (res) => {
        const total = this.fiscalYearStore.state$().total$();
        const list = this.fiscalYearStore.state$().fiscalYears$();
        this.fiscalYearStore.updateFiscalYears([...list, res]);

        this.fiscalYearStore.updateDialogLoading(false);
        this.fiscalYearStore.updateDialogVisibility(false);
        this.fiscalYearStore.updateTotal(total + 1);
      },
      error: () => {
        this.fiscalYearStore.updateDialogLoading(false);
      }
    });
  }

  updateFiscalYear(fiscalYear: FiscalYearModel) {
    this.fiscalYearStore.updateDialogLoading(true);
    this.#updateFiscalYearUseCase.execute(fiscalYear).subscribe({
      next: (res) => {
        const list = this.fiscalYearStore.state$().fiscalYears$();
        const index = list.findIndex(i => i.id == res.id);
        this.fiscalYearStore.updateFiscalYears([
          ...list.slice(0, index),
          res,
          ...list.slice(index + 1)
        ]);

        this.fiscalYearStore.updateDialogLoading(false);
        this.fiscalYearStore.updateDialogVisibility(false);
      },
      error: () => {
        this.fiscalYearStore.updateDialogLoading(false);
      }
    });
  }

  updateSelectedFiscalYear(fiscalYear: FiscalYearModel) {
    this.fiscalYearStore.updateSelectedFiscalYear(fiscalYear);
  }

  @Cache()
  updateFiscalYears(filters: FiscalYearModel) {
    this.#getFiscalYearsUseCase.execute(filters).subscribe(res => {
      this.fiscalYearStore.updateFiscalYears(res);
      res?.length && res[0].totalElements ? this.fiscalYearStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as FiscalYearModelFilter] != undefined && fiscalYearFilterDataMapper.has(each as FiscalYearModelFilter)) {
          tmp.push(fiscalYearFilterDataMapper.get(each as FiscalYearModelFilter)|| '');
        }
      })
      this.fiscalYearStore.updateSearchFilterLabels(tmp);
    })
  }

  @ErrorLogger()
  deleteFiscalYear(id: number) {
    this.#deleteFiscalYearUseCase.execute(id).subscribe(() => {

      const total = this.fiscalYearStore.state$().total$();
      const list = this.fiscalYearStore.state$().fiscalYears$();
      const index = list.findIndex(i => i.id == id);
      this.fiscalYearStore.updateFiscalYears([...list.slice(0, index), ...list.slice(index + 1)]);
      this.fiscalYearStore.updateTotal(total - 1);
    })
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.fiscalYearStore.updateAllowedActions(actions);
  }
}
