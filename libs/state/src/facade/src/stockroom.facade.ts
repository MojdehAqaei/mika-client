import { inject, Injectable } from '@angular/core';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';

import {
  StockroomModel,
  GetStockroomsUseCase,
  DeleteStockroomUseCase,
  SaveStockroomUseCase,
  UpdateStockroomUseCase,
  StockroomModelFilter,
  stockroomFilterDataMapper
} from '@domain/lib/stockroom';
import { StockroomStore } from '../../store';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class StockroomFacade {
  public stockroomStore = inject(StockroomStore);

  readonly #getStockroomsUseCase = inject(GetStockroomsUseCase);
  readonly #deleteStockroomUseCase = inject(DeleteStockroomUseCase);
  readonly #saveStockroomUseCase = inject(SaveStockroomUseCase);
  readonly #updateStockroomUseCase = inject(UpdateStockroomUseCase);


  constructor() {
    this.stockroomStore.updatePageNumber(0);
    this.updateStockroomsList({});
  }

  updateSelectedStockroom(stockroom: StockroomModel) {
    this.stockroomStore.updateSelectedStockroom(stockroom);
  }

  toggleEditMode(editMode: boolean) {
    this.stockroomStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.stockroomStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.stockroomStore.updatePageSize(pageSize);
    this.stockroomStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.stockroomStore.updateAllowedActions(actions);
  }

  saveStockroom(stockroom: StockroomModel) {
    this.stockroomStore.updateDialogLoading(true);
    this.#saveStockroomUseCase.execute(stockroom).subscribe({
      next: (res) => {

        const total = this.stockroomStore.state$().total$();
        const list = this.stockroomStore.state$().stockroomsList$();
        this.stockroomStore.updateStockroomsList([...list, res]);
        this.stockroomStore.updateTotal(total + 1);

        this.stockroomStore.updateDialogLoading(false);
        this.stockroomStore.updateDialogVisibility(false);
      },
      error: () => {
        this.stockroomStore.updateDialogLoading(false);
      }
    });
  }

  updateStockroom(stockroom: StockroomModel) {
    this.stockroomStore.updateDialogLoading(true);
    this.#updateStockroomUseCase.execute(stockroom).subscribe({
      next: (res) => {
        const list = this.stockroomStore.state$().stockroomsList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.stockroomStore.updateStockroomsList([...list]);

        this.stockroomStore.updateDialogLoading(false);
        this.stockroomStore.updateDialogVisibility(false);
      },
      error: () => {
        this.stockroomStore.updateDialogLoading(false);
      }
    });
  }

  @Cache()
  updateStockroomsList(filters: StockroomModel) {
    this.#getStockroomsUseCase.execute(filters).subscribe(res => {
      this.stockroomStore.updateStockroomsList(res);
      res?.length && res[0].totalElements ? this.stockroomStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as StockroomModelFilter] != undefined && stockroomFilterDataMapper.has(each as StockroomModelFilter)) {
          tmp.push(stockroomFilterDataMapper.get(each as StockroomModelFilter)|| '');
        }
      })
      this.stockroomStore.updateSearchFilterLabels(tmp);
    })
  }

  @ErrorLogger()
  deleteStockroom(id: number) {
    this.#deleteStockroomUseCase.execute(id).subscribe(() => {

      const total = this.stockroomStore.state$().total$();
      const list = this.stockroomStore.state$().stockroomsList$();
      const index = list.findIndex(i => i.id === String(id));
      list.splice(index, 1);
      this.stockroomStore.updateStockroomsList([...list]);
      this.stockroomStore.updateTotal(total - 1);
    })
  }
}
