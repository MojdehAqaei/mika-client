import { inject, Injectable } from '@angular/core';
import { GoodsStore } from '../../store';
import {
  DeleteGoodsUseCase,
  GetGoodsByIdUseCase,
  GetGoodsUseCase,
  goodsFilterDataMapper,
  GoodsModel,
  GoodsModelFilter,
  SaveGoodsUseCase,
  UpdateGoodsUseCase
} from '@domain/lib/base-data';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';
import { Crud } from "@view/lib/data-types";


@Injectable()
export class GoodsFacade {
  public goodsStore = inject(GoodsStore);

  readonly #getGoodsUseCase = inject(GetGoodsUseCase);
  readonly #getGoodsByIdUseCase = inject(GetGoodsByIdUseCase);
  readonly #saveGoodsUseCase = inject(SaveGoodsUseCase);
  readonly #updateGoodsUseCase = inject(UpdateGoodsUseCase);
  readonly #deleteGoodsUseCase = inject(DeleteGoodsUseCase);

  constructor() {
    this.goodsStore.updatePageNumber(0);
  }

  /**
   * Get Goods Data
   */
  @Cache()
  updateGoodsTableData(filters: GoodsModel) {
    this.#getGoodsUseCase.execute(filters).subscribe((data: GoodsModel[]) => {
      this.goodsStore.updateGoodsTable(data);
      data?.length && data[0].totalElements ? this.goodsStore.updateTotal(data[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as GoodsModelFilter] != undefined && goodsFilterDataMapper.has(each as GoodsModelFilter)) {
          tmp.push(goodsFilterDataMapper.get(each as GoodsModelFilter)|| '');
        }
      })
      this.goodsStore.updateSearchFilterLabels(tmp);
    });
  }


  /**
   * Update Selected Goods
   * @param id
   */
  updateSelectedGoods(id: number) {
    this.goodsStore.updateDialogLoading(true);
    this.#getGoodsByIdUseCase.execute(id).subscribe({
      next: (res) => {
        this.goodsStore.updateSelectedGoods(res);
        this.goodsStore.updateDialogLoading(false);
      },
      error: () => {
        this.goodsStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Toggle Edit Mode
   * @param editMode
   */
  toggleEditMode(editMode: boolean) {
    this.goodsStore.updateEditMode(editMode);
  }

  /**
   * Toggle Dialog visibility
   * @param visible
   */
  toggleDialogVisibility(visible: boolean) {
    this.goodsStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.goodsStore.updatePageSize(pageSize);
    this.goodsStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.goodsStore.updateAllowedActions(actions);
  }

  /**
   * Save Goods
   * @param goods
   */
  saveGoods(goods: GoodsModel) {
    this.goodsStore.updateDialogLoading(true);
    this.#saveGoodsUseCase.execute(goods).subscribe({
      next: (res) => {

        // adding the new goods to the list
        const total = this.goodsStore.state$().total$();
        const list = this.goodsStore.state$().goodsList$();
        list.push(res);
        this.goodsStore.updateGoodsTable([...list]);

        this.goodsStore.updateDialogLoading(false);
        this.goodsStore.updateDialogVisibility(false);
        this.goodsStore.updateTotal(total + 1);
      },
      error: () => {
        this.goodsStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Update Goods
   * @param goods
   */
  updateGoods(goods: GoodsModel) {
    this.goodsStore.updateDialogLoading(true);
    this.#updateGoodsUseCase.execute(goods).subscribe({
      next: (res) => {

        // updating the selected goods in the list
        const list = this.goodsStore.state$().goodsList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.goodsStore.updateGoodsTable([...list]);

        this.goodsStore.updateDialogLoading(false);
        this.goodsStore.updateDialogVisibility(false);
      },
      error: () => {
        this.goodsStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Delete Goods
   * @param id
   */
  @ErrorLogger()
  deleteGoodsById(id: number) {
    this.#deleteGoodsUseCase.execute(id).subscribe(() => {
      // removing the deleted goods from the list
      const total = this.goodsStore.state$().total$();
      const list = this.goodsStore.state$().goodsList$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.goodsStore.updateGoodsTable([...list]);
      this.goodsStore.updateTotal(total - 1);
    });
  }
}
