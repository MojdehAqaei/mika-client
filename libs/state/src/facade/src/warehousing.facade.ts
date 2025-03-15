import { inject, Injectable } from '@angular/core';
import { WarehousingStore } from '../../store';
import {
  warehousingFilterDataMapper,
  WarehousingModel,
  WarehousingModelFilter,
  GetWarehousingDataUseCase,
  SaveWarehousingUseCase,
  UpdateWarehousingUseCase,
  DeleteWarehousingUseCase,
  WarehousingCountingRoundEnum,
  GetWarehousingCountRoundUseCase,
  SaveWarehousingItemsUseCase, WarehousingItemModel
} from '@domain/lib/stockroom';
import { Crud } from '@view/lib/data-types';
import { Cache } from '@sadad/component-lib/src/decorators';


@Injectable()
export class WarehousingFacade {
  public readonly warehousingStore = inject(WarehousingStore);

  readonly #getWarehousingDataUseCase = inject(GetWarehousingDataUseCase);
  readonly #saveWarehousingUseCase = inject(SaveWarehousingUseCase);
  readonly #updateWarehousingUseCase = inject(UpdateWarehousingUseCase);
  readonly #deleteWarehousingUseCase = inject(DeleteWarehousingUseCase);

  readonly #getWarehousingCountRoundUseCase = inject(GetWarehousingCountRoundUseCase);
  readonly #saveWarehousingItemsUseCase = inject(SaveWarehousingItemsUseCase);


  constructor() {
    this.warehousingStore.updatePageNumber(0);
  }

  toggleEditMode(editMode: boolean) {
    this.warehousingStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.warehousingStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.warehousingStore.updatePageSize(pageSize);
    this.warehousingStore.updatePageNumber(pageNumber);
  }

  updateSelectedWarehousing(warehousing: WarehousingModel) {
    this.warehousingStore.updateSelectedWarehousing(warehousing);
  }

  @Cache()
  updateWarehousingList(filters: WarehousingModel) {
    this.#getWarehousingDataUseCase.execute(filters).subscribe((data: WarehousingModel[]) => {
      this.warehousingStore.updateWarehousingList(data);
      data?.length && data[0].totalElements ? this.warehousingStore.updateTotal(data[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as WarehousingModelFilter] != undefined && warehousingFilterDataMapper.has(each as WarehousingModelFilter)) {
          tmp.push(warehousingFilterDataMapper.get(each as WarehousingModelFilter)|| '');
        }
      })
      this.warehousingStore.updateSearchFilterLabels(tmp);
    });
  }

  savedWarehousing(warehousing: WarehousingModel) {
    this.warehousingStore.updateDialogLoading(true);
    this.#saveWarehousingUseCase.execute(warehousing).subscribe({
      next: (res) => {
          // adding the new warehousing to the list
          const total = this.warehousingStore.state$().total$();
          const list = this.warehousingStore.state$().warehousingList$();
          list.push(res);
          this.warehousingStore.updateWarehousingList([...list]);

          this.warehousingStore.updateDialogLoading(false);
          this.warehousingStore.updateDialogVisibility(false);
          this.warehousingStore.updateTotal(total + 1);
      },
      error: () => {
        this.warehousingStore.updateDialogLoading(false);
      }
    })
  }

  updatedWarehousing(warehousing: WarehousingModel) {
    this.warehousingStore.updateDialogLoading(true);
    this.#updateWarehousingUseCase.execute(warehousing).subscribe({
      next: (res) => {
        // updating the selected warehousing in the list
        const list = this.warehousingStore.state$().warehousingList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.warehousingStore.updateWarehousingList([...list]);

        this.warehousingStore.updateDialogLoading(false);
        this.warehousingStore.updateDialogVisibility(false);
      },
      error: () => {
        this.warehousingStore.updateDialogLoading(false);
      }
    })
  }

  deletedOWarehousing(id: number) {
    this.#deleteWarehousingUseCase.execute(id).subscribe(() => {
    //   removing the deleted warehousing from the list
      const total = this.warehousingStore.state$().total$();
      const list = this.warehousingStore.state$().warehousingList$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.warehousingStore.updateWarehousingList([...list]);
      this.warehousingStore.updateTotal(total - 1);
    })
  }

  updateWarehousingState(params: WarehousingModel) {
    // this.#changewarehousingStateUseCase.execute(params).subscribe(res => {
    //   const list = this.warehousingStore.state$().warehousingList$();
    //   const index = list.findIndex(i => i.id == res.id);
    //   list.splice(index, 1, res);
    //   this.warehousingStore.updateWarehousingList([...list]);
    //   this.warehousingStore.updateSelectedWarehousing(res);
    // });
  }

  @Cache()
  updateWarehousingItemsByRound(round: WarehousingCountingRoundEnum) {
    this.warehousingStore.updateDialogLoading(true);
    this.#getWarehousingCountRoundUseCase.execute(round).subscribe({
      next: res => {
        this.warehousingStore.updateWarehousingItems(res);
        this.warehousingStore.updateDialogLoading(false);
      },
      error: err => {
        this.warehousingStore.updateDialogLoading(false);
      }
    })
  }

  saveWarehousingItems(warehousingItems: WarehousingItemModel[]) {
    this.warehousingStore.updateDialogLoading(true);
    this.#saveWarehousingItemsUseCase.execute(warehousingItems).subscribe({
      next: res => {
        this.warehousingStore.updateDialogLoading(true);
        this.warehousingStore.updateDialogVisibility(false);
      },
      error: err => {
        this.warehousingStore.updateDialogLoading(false);
      }
    })
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.warehousingStore.updateAllowedActions(actions);
  }

}
