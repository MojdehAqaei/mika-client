import { inject, Injectable } from '@angular/core';
import {
  ChangePurchaseStepsStateUseCase,
  DeletePurchaseStepsItemUseCase,
  DeletePurchaseStepsUseCase,
  GetOrderListByStateUseCase,
  GetPurchaseStepsItemListUseCase,
  GetPurchaseStepsListUseCase,
  GetPurchaseStepTypeListUseCase,
  OrderStateEnum,
  purchaseStepsFilterDataMapper,
  PurchaseStepsItemModel,
  PurchaseStepsModel,
  PurchaseStepsModelFilter,
  PurchaseStepTypeModel,
  SavePurchaseStepsItemUseCase,
  SavePurchaseStepsUseCase,
  UpdatePurchaseStepsUseCase
} from '@domain/lib/purchase-and-orders';
import { Cache } from '@sadad/component-lib/src/decorators';
import { PurchaseStepsStore } from '@state/lib/store';
import { Crud } from '@view/lib/data-types';

@Injectable()
export class PurchaseStepsFacade {
  public readonly purchaseStepsStore = inject(PurchaseStepsStore);
  readonly #deletePurchaseStepsUseCase = inject(DeletePurchaseStepsUseCase);
  readonly #deletePurchaseStepsItemUseCase = inject(DeletePurchaseStepsItemUseCase);
  readonly #getOrderListByStateUseCase = inject(GetOrderListByStateUseCase);
  readonly #savePurchaseStepsUseCase = inject(SavePurchaseStepsUseCase);
  readonly #savePurchaseStepsItemUseCase = inject(SavePurchaseStepsItemUseCase);
  readonly #updatePurchaseStepsUseCase = inject(UpdatePurchaseStepsUseCase);
  readonly #changePurchaseStepsStateUseCase = inject(ChangePurchaseStepsStateUseCase);
  readonly #getPurchaseStepsListUseCase = inject(GetPurchaseStepsListUseCase);
  readonly #getPurchaseStepsItemListUseCase = inject(GetPurchaseStepsItemListUseCase);
  readonly #getPurchaseStepTypeListUseCase = inject(GetPurchaseStepTypeListUseCase);



  constructor() {
    this.updatePurchaseStepsList({
      pageNumber: this.purchaseStepsStore.state$().pageNumber$(),
      pageSize: this.purchaseStepsStore.state$().pageSize$(),
    });
  }

  @Cache()
  updatePurchaseStepsList(filters: PurchaseStepsModel) {
    this.#getPurchaseStepsListUseCase
      .execute(filters)
      .subscribe((data: PurchaseStepsModel[]) => {
        this.purchaseStepsStore.updatePurchaseStepsList(data);
        data?.length && data[0].totalElements
          ? this.purchaseStepsStore.updateTotal(data[0].totalElements)
          : '';

        // update search filter labels
        const tmp: string[] = [];
        Object.keys(filters).forEach((each) => {
          if (filters[each as PurchaseStepsModelFilter] != undefined && purchaseStepsFilterDataMapper.has(each as PurchaseStepsModelFilter)
          ) {
            tmp.push(
              purchaseStepsFilterDataMapper.get(
                each as PurchaseStepsModelFilter
              ) || ''
            );
          }
        });
        this.purchaseStepsStore.updateSearchFilterLabels(tmp);
      });
  }

  savedPurchaseSteps(purchaseSteps: PurchaseStepsModel) {
    this.purchaseStepsStore.updateDialogLoading(true);
    this.#savePurchaseStepsUseCase.execute(purchaseSteps).subscribe({
      next: (res) => {
        // adding the new purchase steps to the list
        const total = this.purchaseStepsStore.state$().total$();
        const list = this.purchaseStepsStore.state$().purchaseStepsList$();
        list.push(res);
        this.purchaseStepsStore.updatePurchaseStepsList([...list]);

        this.purchaseStepsStore.updateDialogLoading(false);
        this.purchaseStepsStore.updateDialogVisibility(false);
        this.purchaseStepsStore.updateTotal(total + 1);
      },
      error: () => {
        this.purchaseStepsStore.updateDialogLoading(false);
      }
    })
  }

  savedPurchaseStepsItem(purchaseStepsItem: PurchaseStepsItemModel) {
    this.#savePurchaseStepsItemUseCase.execute(purchaseStepsItem).subscribe((res) => {
      const selectedPurchaseSteps = this.purchaseStepsStore.state$().selectedPurchaseSteps$();
      this.purchaseStepsStore.updateSelectedPurchaseSteps({
        ...selectedPurchaseSteps,
        purchaseStepsItems: [
          ...selectedPurchaseSteps.purchaseStepsItems!,
          res
        ]
      });
    });
  }

  updatedPurchaseSteps(purchaseSteps: PurchaseStepsModel) {
    this.purchaseStepsStore.updateDialogLoading(true);
    this.#updatePurchaseStepsUseCase.execute(purchaseSteps).subscribe({
      next: (res) => {
        // updating the selected purchase steps in the list
        const list = this.purchaseStepsStore.state$().purchaseStepsList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.purchaseStepsStore.updatePurchaseStepsList([...list]);

        this.purchaseStepsStore.updateDialogLoading(false);
        this.purchaseStepsStore.updateDialogVisibility(false);
      },
      error: () => {
        this.purchaseStepsStore.updateDialogLoading(false);
      }
    })
  }

  @Cache()
  updateOrderListPerInvoice(orderState: OrderStateEnum) {
    this.#getOrderListByStateUseCase.execute(orderState).subscribe(res => {
      this.purchaseStepsStore.updateOrderList(res)
    });
  }

  updatePurchaseStepsState(params: PurchaseStepsModel) {
    this.#changePurchaseStepsStateUseCase.execute(params).subscribe(res => {
      const list = this.purchaseStepsStore.state$().purchaseStepsList$();
      const index = list.findIndex(i => i.id == res.id);
      list.splice(index, 1, res);
      this.purchaseStepsStore.updatePurchaseStepsList([...list]);
      this.purchaseStepsStore.updateSelectedPurchaseSteps(res);

      this.purchaseStepsStore.updateDialogVisibility(false);

    });
  }

  deletedPurchaseSteps(id: number) {
    this.#deletePurchaseStepsUseCase.execute(id).subscribe(() => {
      const total = this.purchaseStepsStore.state$().total$();
      const list = this.purchaseStepsStore.state$().purchaseStepsList$();
      const index = list.findIndex((i) => i.id == id);
      list.splice(index, 1);
      this.purchaseStepsStore.updatePurchaseStepsList([...list]);
      this.purchaseStepsStore.updateTotal(total - 1);
    });
  }

  deletedPurchaseStepsItem(id: number) {
    this.#deletePurchaseStepsItemUseCase.execute(id).subscribe(() => {
      const selectedPurchaseSteps = this.purchaseStepsStore.state$().selectedPurchaseSteps$();
      this.purchaseStepsStore.updateSelectedPurchaseSteps({
        ...selectedPurchaseSteps,
        purchaseStepsItems: selectedPurchaseSteps.purchaseStepsItems!.filter(i => i.id != id)
      });
    });
  }

  updatePurchaseStepTypeList(type: PurchaseStepTypeModel) {
    this.#getPurchaseStepTypeListUseCase.execute(type).subscribe(res => {
      this.purchaseStepsStore.updatePurchaseStepTypeList(res);
    });
  }

  toggleDialogVisibility(visible: boolean) {
    this.purchaseStepsStore.updateDialogVisibility(visible);
  }
  updateSelectedPurchaseSteps(purchaseSteps: PurchaseStepsModel) {
    this.purchaseStepsStore.updateSelectedPurchaseSteps(purchaseSteps);
  }

  toggleEditMode(editMode: boolean) {
    this.purchaseStepsStore.updateEditMode(editMode);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.purchaseStepsStore.updatePageSize(pageSize);
    this.purchaseStepsStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.purchaseStepsStore.updateAllowedActions(actions);
  }
}
