import { inject, Injectable } from '@angular/core';
import { GoodsDeliveryStore } from '../../store';
import {
  GoodsDeliveryItemModel,
  GoodsDeliveryModel,
  GoodsDeliveryModelFilter,
  DeleteGoodsDeliveryUseCase,
  SaveGoodsDeliveryUseCase,
  UpdateGoodsDeliveryUseCase,
  GetDeliveryItemsByDeliveryIdUseCase,
  GetDeliveryListUseCase,
  ChangeDeliveryStateUseCase,
  UpdateDeliveryItemsListUseCase,
  UpdateDeliveryItemsInformaticsSerialNumberListUseCase,
  GetAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase,
  ExportDeliverySerialNumbersExcelFileUseCase,
  ExportDeliveryListExcelFileUseCase,
  GetAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase,
  goodsDeliveryFilterDataMapper
} from '@domain/lib/purchase-and-orders';
import { Crud } from "@view/lib/data-types";
import { Cache } from '@sadad/component-lib/src/decorators';
import { ArrayHelperService } from '@view/lib/ui-services';
import { SelectItem } from '@view/lib/models';
import { ClGenerateFileService } from '@sadad/component-lib/src/services';



@Injectable()
export class GoodsDeliveryFacade {
  public readonly goodsDeliveryStore = inject(GoodsDeliveryStore);

  readonly #generateFileService = inject(ClGenerateFileService);

  readonly #getDeliveryListUseCase = inject(GetDeliveryListUseCase);
  readonly #exportDeliveryListExcelFileUseCase = inject(ExportDeliveryListExcelFileUseCase);
  readonly #exportDeliverySerialNumbersExcelFileUseCase = inject(ExportDeliverySerialNumbersExcelFileUseCase);
  readonly #saveGoodsDeliveryUseCase = inject(SaveGoodsDeliveryUseCase);
  readonly #updateGoodsDeliveryUseCase = inject(UpdateGoodsDeliveryUseCase);
  readonly #deleteGoodsDeliveryUseCase = inject(DeleteGoodsDeliveryUseCase);
  readonly #changeDeliveryStateUseCase = inject(ChangeDeliveryStateUseCase);
  readonly #getDeliveryItemsByDeliveryIdUseCase = inject(GetDeliveryItemsByDeliveryIdUseCase);
  readonly #updateDeliveryItemsListUseCase = inject(UpdateDeliveryItemsListUseCase);
  readonly #updateDeliveryItemsInformaticsSerialNumberListUseCase = inject(UpdateDeliveryItemsInformaticsSerialNumberListUseCase);
  readonly #getAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase = inject(GetAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase);
  readonly #getAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase = inject(GetAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase);

  constructor() {
    this.goodsDeliveryStore.updatePageNumber(0);
  }

  toggleEditMode(editMode: boolean) {
    this.goodsDeliveryStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.goodsDeliveryStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.goodsDeliveryStore.updatePageSize(pageSize);
    this.goodsDeliveryStore.updatePageNumber(pageNumber);
  }

  updateSelectedGoodsDelivery(goodsDelivery: GoodsDeliveryModel) {
    this.goodsDeliveryStore.updateSelectedGoodsDelivery(goodsDelivery);
  }

  updateItemsOfSelectedGoodsDelivery(goodsDeliveryItem: GoodsDeliveryItemModel, mode: 'add' | 'remove') {
    goodsDeliveryItem?.availableSerialNumbers?.length ? goodsDeliveryItem.availableSerialNumbers = goodsDeliveryItem.availableSerialNumbers?.map(s => {return {value: s}}) : '';
    const selectedGoodsDelivery = this.goodsDeliveryStore.state$().selectedGoodsDelivery$();
    let deliveryItemsList = selectedGoodsDelivery?.deliveryItemsList;

    if (mode == 'add') {
      deliveryItemsList = ArrayHelperService.filterOutDuplicatedItemsByKey((deliveryItemsList || []).concat(goodsDeliveryItem), 'goodsId');

    } else if (mode =='remove') {
      const index = deliveryItemsList?.findIndex(i => i.id == goodsDeliveryItem.id);
      if (index != undefined && index > -1) {
        deliveryItemsList?.splice(index, 1);
      }
    }

    selectedGoodsDelivery.deliveryItemsList = [...deliveryItemsList || []];
    this.goodsDeliveryStore.updateSelectedGoodsDelivery(selectedGoodsDelivery);
  }

  @Cache()
  updateSelectedGoodsDeliveryItemsListByDeliveryId(id: number) {
    this.#getDeliveryItemsByDeliveryIdUseCase.execute(id).subscribe(res => {
      const list = this.goodsDeliveryStore.state$().goodsDeliveryList$();
      const index = list.findIndex(i => i.id == id);

      let goodsDelivery = this.goodsDeliveryStore.state$().selectedGoodsDelivery$();
      goodsDelivery.ifDeliveryItemsLoaded = true;
      goodsDelivery.deliveryItemsList = [...res];
      list.splice(index, 1, goodsDelivery);
      this.goodsDeliveryStore.updateSelectedGoodsDelivery({...goodsDelivery});
    });
  }

  @Cache()
  exportGoodsDeliveryListExcelFile(filters: GoodsDeliveryModel) {
    this.#exportDeliveryListExcelFileUseCase.execute(filters).subscribe(
      res => {
        this.#generateFileService.generateDownloadableFile(res);
      }
    )
  }

  @Cache()
  exportGoodsDeliverySerialNumbersExcelFile(filters: GoodsDeliveryModel) {
    this.#exportDeliverySerialNumbersExcelFileUseCase.execute(filters).subscribe(
      res => {
        this.#generateFileService.generateDownloadableFile(res);
      }
    )
  }

  @Cache()
  updateGoodsDeliveryList(filters: GoodsDeliveryModel) {
    this.#getDeliveryListUseCase.execute(filters).subscribe((data: GoodsDeliveryModel[]) => {
      this.goodsDeliveryStore.updateGoodsDeliveryList(data);
      data?.length && data[0].totalElements ? this.goodsDeliveryStore.updateTotal(data[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as GoodsDeliveryModelFilter] != undefined && goodsDeliveryFilterDataMapper.has(each as GoodsDeliveryModelFilter)) {
          tmp.push(goodsDeliveryFilterDataMapper.get(each as GoodsDeliveryModelFilter)|| '');
        }
      })
      this.goodsDeliveryStore.updateSearchFilterLabels(tmp);
    });
  }

  savedGoodsDelivery(goodsDelivery: GoodsDeliveryModel) {
    this.goodsDeliveryStore.updateDialogLoading(true);
    this.#saveGoodsDeliveryUseCase.execute(goodsDelivery).subscribe({
      next: (res) => {
          // adding the new goods delivery to the list
        const total = this.goodsDeliveryStore.state$().total$();
        const list = this.goodsDeliveryStore.state$().goodsDeliveryList$();
        list.push(res);
        this.goodsDeliveryStore.updateGoodsDeliveryList([...list]);
        this.goodsDeliveryStore.updateSelectedGoodsDelivery(res);

        this.goodsDeliveryStore.updateDialogLoading(false);
        this.goodsDeliveryStore.updateFormStepValidity(true);
        this.goodsDeliveryStore.updateTotal(total + 1);
      },
      error: () => {
        this.goodsDeliveryStore.updateDialogLoading(false);
        this.goodsDeliveryStore.updateFormStepValidity(false);
      }
    })
  }

  updatedGoodsDelivery(goodsDelivery: GoodsDeliveryModel) {
    this.goodsDeliveryStore.updateDialogLoading(true);
    this.#updateGoodsDeliveryUseCase.execute(goodsDelivery).subscribe({
      next: (res) => {
        // updating the selected goods delivery in the list
        const list = this.goodsDeliveryStore.state$().goodsDeliveryList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        const selectedGoodsDelivery = this.goodsDeliveryStore.state$().selectedGoodsDelivery$();
        ~this.goodsDeliveryStore.updateGoodsDeliveryList([...list]);
        this.goodsDeliveryStore.updateSelectedGoodsDelivery({ ...res, deliveryItemsList: selectedGoodsDelivery.deliveryItemsList});

        this.goodsDeliveryStore.updateFormStepValidity(true);
        this.goodsDeliveryStore.updateDialogLoading(false);
      },
      error: () => {
        this.goodsDeliveryStore.updateFormStepValidity(false);
        this.goodsDeliveryStore.updateDialogLoading(false);
      }
    })
  }

  deletedGoodsDelivery(id: number) {
    this.#deleteGoodsDeliveryUseCase.execute(id).subscribe(() => {
      // removing the deleted goods delivery from the list
      const total = this.goodsDeliveryStore.state$().total$();
      const list = this.goodsDeliveryStore.state$().goodsDeliveryList$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.goodsDeliveryStore.updateGoodsDeliveryList([...list]);
      this.goodsDeliveryStore.updateTotal(total - 1);
    })
  }

  updateDeliveryState(params: GoodsDeliveryModel) {
    this.#changeDeliveryStateUseCase.execute(params).subscribe(res => {
      const delivery = this.goodsDeliveryStore.state$().selectedGoodsDelivery$();
      const list = this.goodsDeliveryStore.state$().goodsDeliveryList$();
      const index = list.findIndex(i => i.id == res.id);
      const updatedDelivery = {
        ...res,
        deliveryItemsList: delivery.deliveryItemsList,
        ifDeliveryItemsLoaded: delivery.ifDeliveryItemsLoaded
      };

      list.splice(index, 1, updatedDelivery);
      this.goodsDeliveryStore.updateGoodsDeliveryList([...list]);
      this.goodsDeliveryStore.updateSelectedGoodsDelivery(updatedDelivery);

      this.goodsDeliveryStore.updateDialogVisibility(false);

    });
  }

  updateGoodsDeliveryItems(params: GoodsDeliveryItemModel[]) {
    this.goodsDeliveryStore.updateDialogLoading(true);
      this.#updateDeliveryItemsListUseCase.execute(params).subscribe({
        next: res => {
          this.goodsDeliveryStore.updateFormStepValidity(true);
          this.goodsDeliveryStore.updateDialogLoading(false);
        },
        error: () => {
          this.goodsDeliveryStore.updateDialogLoading(false);
          this.goodsDeliveryStore.updateFormStepValidity(false);
        }
      });
  }

  updateGoodsDeliveryItemsNewInformaticsSerialNumber(deliveryItemGoodsId?: number, serialList?: SelectItem[]) {
    const goodsDelivery = this.goodsDeliveryStore.state$().selectedGoodsDelivery$();
    const goodsDeliveryItem = goodsDelivery.deliveryItemsList?.find(i => i.goodsId == deliveryItemGoodsId);
    if (goodsDeliveryItem) {
      goodsDeliveryItem.serialNumbers = serialList;
    }
  }

  updateGoodsDeliveryItemsAvailableInformaticsSerialNumber(deliveryItemGoodsId?: number, serialIdList?: string[]) {
    const goodsDelivery = this.goodsDeliveryStore.state$().selectedGoodsDelivery$();
    const goodsDeliveryItem = goodsDelivery.deliveryItemsList?.find(i => i.goodsId == deliveryItemGoodsId);
    if (goodsDeliveryItem) {
      goodsDeliveryItem.availableSerialNumbers = serialIdList?.map(s => {return {value: s}});
    }
  }

  updateInformaticsSerialListByDeliveryId(serialList: GoodsDeliveryItemModel[]) {
    this.goodsDeliveryStore.updateDialogLoading(true);
    this.#updateDeliveryItemsInformaticsSerialNumberListUseCase.execute(serialList).subscribe({
      next: () => {
        this.goodsDeliveryStore.updateDialogLoading(false);
      },
      error: () => {
        this.goodsDeliveryStore.updateDialogLoading(false);
      }
    });
  }

  @Cache()
  updateAvailableInformaticsSerialNumbersList(goodsId?: number, stockroomId?: number, organizationId?: number) {
    this.#getAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase.execute({ goodsId, stockroomId, organizationId }).subscribe(
      res => {
        this.goodsDeliveryStore.updateInformaticsSerialNumbers([...res]);
      }
    );
  }

  @Cache()
  updateAllSelectableInformaticsSerialNumbersList(deliveryItemId?: number, goodsId?: number, stockroomId?: number, organizationId?: number) {
    this.#getAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase.execute({ deliveryItemId, goodsId, stockroomId, organizationId }).subscribe(
      res => {
        this.goodsDeliveryStore.updateInformaticsSerialNumbers([...res]);
      }
    );
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.goodsDeliveryStore.updateAllowedActions(actions);
  }

}
