import { Component, effect, inject, input, InputSignal, output, OutputEmitterRef, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { FormControl } from '@angular/forms';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { ClChipsComponent } from '@sadad/component-lib/src/lib/chips';
import { GoodsDeliveryItemModel, GoodsDeliveryTypeEnum } from '@domain/lib/purchase-and-orders';
import { GoodsDeliveryFacade } from '@state/lib/facade';
import { SelectItem } from '@view/lib/models';
import { GoodsDeliveryItemForm } from '../../../../forms/goods-delivery-item.form';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClListBoxComponent } from '@sadad/component-lib/src/lib/list-box';
import { SerialNumberService } from '../../../../services/serial-number/serial-number.service';

@Component({
  selector: 'purchase-goods-delivery-item-serial-number',
  standalone: true,
  imports: [CommonModules, ClKeyFilterDirective, ClChipsComponent, ClListBoxComponent],
  templateUrl: './goods-delivery-item-serial-number.component.html'
})
export class GoodsDeliveryItemSerialNumberComponent extends BaseComponent<GoodsDeliveryItemModel> {
  readonly goodsDeliveryFacade = inject(GoodsDeliveryFacade);
  readonly #invokeService = inject(ActionInvokeService);

  readonlySerial: InputSignal<boolean> = input<boolean>(false);
  deliveryItem: InputSignal<GoodsDeliveryItemModel> = input<GoodsDeliveryItemModel>({});
  goodsDeliveryItemModelChange: OutputEmitterRef<GoodsDeliveryItemModel> = output();

  goodsDeliveryTypeEnum: typeof GoodsDeliveryTypeEnum = GoodsDeliveryTypeEnum;

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.updateSerialNumbersList();
    });

    this.formGroup = this.fb.group<GoodsDeliveryItemForm>({
      serialNumbers: new FormControl({value: null, disabled: this.readonlySerial()}),
      availableSerialNumbers: new FormControl({value: null, disabled: this.readonlySerial()}),
    });

    effect(() => {
      const delivery = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$();
      const allSelectableInformaticsSerialNumbers = this.goodsDeliveryFacade.goodsDeliveryStore.state$().informaticsSerialNumbers$();
      const deliveryItem = this.deliveryItem();
      const readonlySerial = this.readonlySerial();

      /*this.serialNumberList?.forEach((s, index) => {
        this.formGroup?.addControl('serial-'+index, new FormControl(s));
      })*/

      untracked(() => {
        const [stockroomId, organizationId] = SerialNumberService.setAvailableInformaticsSerialNumbersListParams(delivery.deliveryType, delivery.delivererId);
        if (deliveryItem.serialType == 'INFORMATICS_SERIES' && (stockroomId || organizationId)) {
          if (deliveryItem.id) {
            this.goodsDeliveryFacade.updateAllSelectableInformaticsSerialNumbersList(deliveryItem.id, deliveryItem.goodsId, stockroomId, organizationId);
          } else {
            this.goodsDeliveryFacade.updateAvailableInformaticsSerialNumbersList(deliveryItem.goodsId, stockroomId, organizationId);
          }
        }

        if (readonlySerial) {
          this.formGroup.get('serialNumbers')?.disable();
          this.formGroup.get('availableSerialNumbers')?.disable();
        } else {
          this.formGroup.get('serialNumbers')?.enable();
          this.formGroup.get('availableSerialNumbers')?.enable();
        }

        if (allSelectableInformaticsSerialNumbers?.length && deliveryItem.availableSerialNumbers?.length) {
          this.formGroup.get('availableSerialNumbers')?.setValue(deliveryItem.availableSerialNumbers?.map(e => e.value));
        }

        this.formGroup.get('serialNumbers')?.setValue(deliveryItem?.serialNumbers);
      })
    });
  }

  addORemoveNewSerialNumber(serialList: SelectItem[]) {
    if (this.deliveryItem().goodsId) {
      this.goodsDeliveryFacade.updateGoodsDeliveryItemsNewInformaticsSerialNumber(this.deliveryItem().goodsId, serialList);
    }
  }

  selectAvailableSerialNumber(serialIdList: string[]) {
    if (this.deliveryItem().goodsId) {
      this.goodsDeliveryFacade.updateGoodsDeliveryItemsAvailableInformaticsSerialNumber(this.deliveryItem().goodsId, serialIdList);
    }
  }

  updateSerialNumbersList() {
    this.goodsDeliveryItemModelChange.emit(this.deliveryItem());
  }
}
