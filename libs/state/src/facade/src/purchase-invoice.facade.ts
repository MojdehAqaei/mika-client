import { inject, Injectable } from '@angular/core';
import {
  ChangePurchaseInvoiceStateUseCase,
  DeletePurchaseInvoiceUseCase,
  GetOrderListByStateUseCase,
  GetPurchaseInvoiceListUseCase,
  OrderItemModel,
  OrderStateEnum,
  purchaseInvoiceFilterDataMapper,
  PurchaseInvoiceItemModel,
  PurchaseInvoiceModel,
  PurchaseInvoiceModelFilter,
  SavePurchaseInvoiceUseCase,
  UpdatePurchaseInvoiceUseCase
} from '@domain/lib/purchase-and-orders';
import { Cache } from '@sadad/component-lib/src/decorators';
import { PurchaseInvoiceStore } from '@state/lib/store';
import { Crud } from '@view/lib/data-types';
import { SelectItem } from '@view/lib/models';

@Injectable()
export class PurchaseInvoiceFacade {
  public readonly purchaseInvoiceStore = inject(PurchaseInvoiceStore);
  readonly #deletePurchaseInvoiceUseCase = inject(DeletePurchaseInvoiceUseCase);
  readonly #getOrderListByStateUseCase = inject(GetOrderListByStateUseCase);
  readonly #savePurchaseInvoiceUseCase = inject(SavePurchaseInvoiceUseCase);
  readonly #updatePurchaseInvoiceUseCase = inject(UpdatePurchaseInvoiceUseCase);
  readonly #changePurchaseInvoiceStateUseCase = inject(ChangePurchaseInvoiceStateUseCase);
  readonly #getPurchaseInvoiceListUseCase = inject(
    GetPurchaseInvoiceListUseCase
  );



  constructor() {
    this.updatePurchaseInvoiceList({
      pageNumber: this.purchaseInvoiceStore.state$().pageNumber$(),
      pageSize: this.purchaseInvoiceStore.state$().pageSize$(),
    });
    this.updateOrderListPerInvoice(OrderStateEnum.WAIT_FOR_BUY);
  }

  updatePurchaseInvoiceItemsList(items: PurchaseInvoiceItemModel[]) {
    this.purchaseInvoiceStore.updatePurchaseInvoiceList(items);
  }

  @Cache()
  updatePurchaseInvoiceList(filters: PurchaseInvoiceModel) {
    this.#getPurchaseInvoiceListUseCase
      .execute(filters)
      .subscribe((data: PurchaseInvoiceModel[]) => {
        this.purchaseInvoiceStore.updatePurchaseInvoiceList(data);
        data?.length && data[0].totalElements
          ? this.purchaseInvoiceStore.updateTotal(data[0].totalElements)
          : '';

        // update search filter labels
        const tmp: string[] = [];
        Object.keys(filters).forEach((each) => {
          if (filters[each as PurchaseInvoiceModelFilter] != undefined && purchaseInvoiceFilterDataMapper.has(each as PurchaseInvoiceModelFilter)
          ) {
            tmp.push(
              purchaseInvoiceFilterDataMapper.get(
                each as PurchaseInvoiceModelFilter
              ) || ''
            );
          }
        });
        this.purchaseInvoiceStore.updateSearchFilterLabels(tmp);
      });
  }

  updateOrderItemListPerOrderId(orderItemList: SelectItem<OrderItemModel>[]) {
    this.purchaseInvoiceStore.updateOrderItemsPerOrderId(orderItemList);
  }

  @Cache()
  updateOrderListPerInvoice(orderState: OrderStateEnum) {
    this.#getOrderListByStateUseCase.execute(orderState).subscribe(res => {
      this.purchaseInvoiceStore.updateOrderListPerInvoice(res)
    });
  }

  savedPurchaseInvoice(purchaseInvoice: PurchaseInvoiceModel) {
    this.purchaseInvoiceStore.updateDialogLoading(true);
    this.#savePurchaseInvoiceUseCase.execute(purchaseInvoice).subscribe({
      next: (res) => {
        // adding the new purchase invoice to the list
        const total = this.purchaseInvoiceStore.state$().total$();
        const list = this.purchaseInvoiceStore.state$().purchaseInvoiceList$();
        list.push(res);
        this.purchaseInvoiceStore.updatePurchaseInvoiceList([...list]);

        this.purchaseInvoiceStore.updateDialogLoading(false);
        this.purchaseInvoiceStore.updateDialogVisibility(false);
        this.purchaseInvoiceStore.updateTotal(total + 1);
      },
      error: () => {
        this.purchaseInvoiceStore.updateDialogLoading(false);
      }
    })
  }

  updatedPurchaseInvoice(purchaseInvoice: PurchaseInvoiceModel) {
    this.purchaseInvoiceStore.updateDialogLoading(true);
    this.#updatePurchaseInvoiceUseCase.execute(purchaseInvoice).subscribe({
      next: (res) => {
        // updating the selected purchase invoice in the list
        const list = this.purchaseInvoiceStore.state$().purchaseInvoiceList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.purchaseInvoiceStore.updatePurchaseInvoiceList([...list]);

        this.purchaseInvoiceStore.updateDialogLoading(false);
        this.purchaseInvoiceStore.updateDialogVisibility(false);
      },
      error: () => {
        this.purchaseInvoiceStore.updateDialogLoading(false);
      }
    })
  }

  updatePurchaseInvoiceState(params: PurchaseInvoiceModel) {
    this.#changePurchaseInvoiceStateUseCase.execute(params).subscribe(res => {
      const list = this.purchaseInvoiceStore.state$().purchaseInvoiceList$();
      const index = list.findIndex(i => i.id == res.id);
      list.splice(index, 1, res);
      this.purchaseInvoiceStore.updatePurchaseInvoiceList([...list]);
      this.purchaseInvoiceStore.updateSelectedPurchaseInvoice(res);

      this.purchaseInvoiceStore.updateDialogVisibility(false);

    });
  }

  deletedPurchaseInvoice(id: number) {
    this.#deletePurchaseInvoiceUseCase.execute(id).subscribe(() => {
      const total = this.purchaseInvoiceStore.state$().total$();
      const list = this.purchaseInvoiceStore.state$().purchaseInvoiceList$();
      const index = list.findIndex((i) => i.id == id);
      list.splice(index, 1);
      this.purchaseInvoiceStore.updatePurchaseInvoiceList([...list]);
      this.purchaseInvoiceStore.updateTotal(total - 1);
    });
  }

  toggleDialogVisibility(visible: boolean) {
    this.purchaseInvoiceStore.updateDialogVisibility(visible);
  }
  updateSelectedPurchaseInvoice(purchaseInvoice: PurchaseInvoiceModel) {
    this.purchaseInvoiceStore.updateSelectedPurchaseInvoice(purchaseInvoice);
  }

  toggleEditMode(editMode: boolean) {
    this.purchaseInvoiceStore.updateEditMode(editMode);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.purchaseInvoiceStore.updatePageSize(pageSize);
    this.purchaseInvoiceStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.purchaseInvoiceStore.updateAllowedActions(actions);
  }
}
