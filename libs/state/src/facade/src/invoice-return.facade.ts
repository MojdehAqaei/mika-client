import { inject, Injectable } from '@angular/core';
import {
  ChangeInvoiceReturnStateUseCase,
  DeleteInvoiceReturnUseCase,
  GetInvoiceReturnListUseCase,
  GetPurchaseInvoiceListByStateUseCase,
  invoiceReturnFilterDataMapper,
  InvoiceReturnItemModel,
  InvoiceReturnModel,
  InvoiceReturnModelFilter,
  InvoiceStateEnum,
  SaveInvoiceReturnUseCase,
  UpdateInvoiceReturnUseCase
} from '@domain/lib/purchase-and-orders';
import { Cache } from '@sadad/component-lib/src/decorators';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { InvoiceReturnStore } from '@state/lib/store';
import { Crud } from '@view/lib/data-types';

@Injectable()
export class InvoiceReturnFacade {
  public readonly invoiceReturnStore = inject(InvoiceReturnStore);
  readonly #deleteInvoiceReturnUseCase = inject(DeleteInvoiceReturnUseCase);
  readonly #getPurchaseInvoiceListByStateUseCase = inject(GetPurchaseInvoiceListByStateUseCase);
  readonly #saveInvoiceReturnUseCase = inject(SaveInvoiceReturnUseCase);
  readonly #updateInvoiceReturnUseCase = inject(UpdateInvoiceReturnUseCase);
  readonly #changeInvoiceReturnStateUseCase = inject(ChangeInvoiceReturnStateUseCase);
  readonly #getInvoiceReturnListUseCase = inject(GetInvoiceReturnListUseCase);



  constructor() {
    this.updateInvoiceReturnList({
      pageNumber: this.invoiceReturnStore.state$().pageNumber$(),
      pageSize: this.invoiceReturnStore.state$().pageSize$(),
    });
  }

  updateInvoiceReturnItemsList(items: InvoiceReturnItemModel[]) {
    this.invoiceReturnStore.updateInvoiceReturnList(items);
  }

  @Cache()
  updateInvoiceReturnList(filters: InvoiceReturnModel) {
    this.#getInvoiceReturnListUseCase
      .execute(filters)
      .subscribe((data: InvoiceReturnModel[]) => {
        this.invoiceReturnStore.updateInvoiceReturnList(data);
        data?.length && data[0].totalElements
          ? this.invoiceReturnStore.updateTotal(data[0].totalElements)
          : '';

        // update search filter labels
        const tmp: string[] = [];
        Object.keys(filters).forEach((each) => {
          if (filters[each as InvoiceReturnModelFilter] != undefined && invoiceReturnFilterDataMapper.has(each as InvoiceReturnModelFilter)
          ) {
            tmp.push(
              invoiceReturnFilterDataMapper.get(
                each as InvoiceReturnModelFilter
              ) || ''
            );
          }
        });
        this.invoiceReturnStore.updateSearchFilterLabels(tmp);
      });
  }

  updatePurchaseInvoiceItemList(orderItemList: ClSelectItem[]) {
    this.invoiceReturnStore.updatePurchaseInvoiceItems(orderItemList);
  }

  updatePurchaseInvoiceList(invoiceState: InvoiceStateEnum) {
    this.#getPurchaseInvoiceListByStateUseCase.execute(invoiceState).subscribe(res => {
      this.invoiceReturnStore.updatePurchaseInvoiceList(res)
    });
  }

  savedInvoiceReturn(invoiceReturn: InvoiceReturnModel) {
    this.invoiceReturnStore.updateDialogLoading(true);
    this.#saveInvoiceReturnUseCase.execute(invoiceReturn).subscribe({
      next: (res) => {
        const total = this.invoiceReturnStore.state$().total$();
        const list = this.invoiceReturnStore.state$().invoiceReturnList$();
        list.push(res);
        this.invoiceReturnStore.updateInvoiceReturnList([...list]);

        this.invoiceReturnStore.updateDialogLoading(false);
        this.invoiceReturnStore.updateDialogVisibility(false);
        this.invoiceReturnStore.updateTotal(total + 1);
      },
      error: () => {
        this.invoiceReturnStore.updateDialogLoading(false);
      }
    })
  }

  updatedInvoiceReturn(invoiceReturn: InvoiceReturnModel) {
    this.invoiceReturnStore.updateDialogLoading(true);
    this.#updateInvoiceReturnUseCase.execute(invoiceReturn).subscribe({
      next: (res) => {
        const list = this.invoiceReturnStore.state$().invoiceReturnList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.invoiceReturnStore.updateInvoiceReturnList([...list]);

        this.invoiceReturnStore.updateDialogLoading(false);
        this.invoiceReturnStore.updateDialogVisibility(false);
      },
      error: () => {
        this.invoiceReturnStore.updateDialogLoading(false);
      }
    })
  }

  updateInvoiceReturnState(params: InvoiceReturnModel) {
    this.#changeInvoiceReturnStateUseCase.execute(params).subscribe(res => {
      const list = this.invoiceReturnStore.state$().invoiceReturnList$();
      const index = list.findIndex(i => i.id == res.id);
      list.splice(index, 1, res);
      this.invoiceReturnStore.updateInvoiceReturnList([...list]);
      this.invoiceReturnStore.updateSelectedInvoiceReturn(res);

      this.invoiceReturnStore.updateDialogVisibility(false);

    });
  }

  deletedInvoiceReturn(id: number) {
    this.#deleteInvoiceReturnUseCase.execute(id).subscribe(() => {
      const total = this.invoiceReturnStore.state$().total$();
      const list = this.invoiceReturnStore.state$().invoiceReturnList$();
      const index = list.findIndex((i) => i.id == id);
      list.splice(index, 1);
      this.invoiceReturnStore.updateInvoiceReturnList([...list]);
      this.invoiceReturnStore.updateTotal(total - 1);
    });
  }

  toggleDialogVisibility(visible: boolean) {
    this.invoiceReturnStore.updateDialogVisibility(visible);
  }
  updateSelectedInvoiceReturn(invoiceReturn: InvoiceReturnModel) {
    this.invoiceReturnStore.updateSelectedInvoiceReturn(invoiceReturn);
  }

  toggleEditMode(editMode: boolean) {
    this.invoiceReturnStore.updateEditMode(editMode);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.invoiceReturnStore.updatePageSize(pageSize);
    this.invoiceReturnStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.invoiceReturnStore.updateAllowedActions(actions);
  }
}
