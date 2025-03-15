import { inject, Injectable } from '@angular/core';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';

import {
  DeleteInventoryTypeUseCase,
  InventoryTypeModel,
  GetInventoryTypesUseCase,
  SaveInventoryTypeUseCase,
  UpdateInventoryTypeUseCase,
  GetInventoryTypeByIdUseCase,
  InventoryTypeModelFilter,
  inventoryTypeFilterDataMapper
} from '@domain/lib/stockroom';
import { InventoryTypeStore } from '../../store';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class InventoryTypeFacade {
  public inventoryTypeStore = inject(InventoryTypeStore);

  readonly #getInventoryTypesUseCase = inject(GetInventoryTypesUseCase);
  readonly #getInventoryTypeByIdUseCase = inject(GetInventoryTypeByIdUseCase);
  readonly #updateInventoryTypeUseCase = inject(UpdateInventoryTypeUseCase);
  readonly #deleteInventoryTypeUseCase = inject(DeleteInventoryTypeUseCase);
  readonly #saveInventoryTypeUseCase = inject(SaveInventoryTypeUseCase);

  constructor() {
    this.inventoryTypeStore.updatePageNumber(0);
    this.updateInventoryTypes({});
  }

  toggleEditMode(editMode: boolean) {
    this.inventoryTypeStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.inventoryTypeStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.inventoryTypeStore.updatePageSize(pageSize);
    this.inventoryTypeStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.inventoryTypeStore.updateAllowedActions(actions);
  }

  saveInventoryType(inventoryType: InventoryTypeModel) {
    this.inventoryTypeStore.updateDialogLoading(true);
    this.#saveInventoryTypeUseCase.execute(inventoryType).subscribe({
      next: (res) => {

        const total = this.inventoryTypeStore.state$().total$();
        const list = this.inventoryTypeStore.state$().inventoryTypes$();
        list.push(res);
        this.inventoryTypeStore.updateInventoryTypes([...list]);

        this.inventoryTypeStore.updateDialogLoading(false);
        this.inventoryTypeStore.updateDialogVisibility(false);
        this.inventoryTypeStore.updateTotal(total + 1);
      },
      error: () => {
        this.inventoryTypeStore.updateDialogLoading(false);
      }
    });
  }

  updateInventoryType(inventoryType: InventoryTypeModel) {
    this.inventoryTypeStore.updateDialogLoading(true);
    this.#updateInventoryTypeUseCase.execute(inventoryType).subscribe({
      next: (res) => {
        this.inventoryTypeStore.updateDialogLoading(false);
        this.inventoryTypeStore.updateDialogVisibility(false);

        const list = this.inventoryTypeStore.state$().inventoryTypes$();
        const index = list.findIndex(i => i.id == res.id);
        this.inventoryTypeStore.updateInventoryTypes([
          ...list.slice(0, index),
          res,
          ...list.slice(index + 1)
        ]);
      },
      error: () => {
        this.inventoryTypeStore.updateDialogLoading(false);
      }
    });
  }

  updateSelectedInventoryType(id: number) {
    this.inventoryTypeStore.updateDialogLoading(true);
    this.#getInventoryTypeByIdUseCase.execute(id).subscribe({
      next: (res) => {
        this.inventoryTypeStore.updateSelectedInventoryType(res);
        this.inventoryTypeStore.updateDialogLoading(false);
      },
      error: () => {
        this.inventoryTypeStore.updateDialogLoading(false);
      }
    });
  }

  @Cache()
  updateInventoryTypes(filters: InventoryTypeModel) {
    this.#getInventoryTypesUseCase.execute(filters).subscribe(res => {
      this.inventoryTypeStore.updateInventoryTypes(res);
      res?.length && res[0].totalElements ? this.inventoryTypeStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as InventoryTypeModelFilter] != undefined && inventoryTypeFilterDataMapper.has(each as InventoryTypeModelFilter)) {
          tmp.push(inventoryTypeFilterDataMapper.get(each as InventoryTypeModelFilter)|| '');
        }
      })
      this.inventoryTypeStore.updateSearchFilterLabels(tmp);
    })
  }

  @ErrorLogger()
  deleteInventoryType(id: number) {
    this.#deleteInventoryTypeUseCase.execute(id).subscribe(() => {

      const total = this.inventoryTypeStore.state$().total$();
      const list = this.inventoryTypeStore.state$().inventoryTypes$();
      const index = list.findIndex(i => i.id == id);
      this.inventoryTypeStore.updateInventoryTypes([...list.slice(0, index), ...list.slice(index + 1)]);
      this.inventoryTypeStore.updateTotal(total - 1);
    })
  }
}
