import { Component, effect, Inject, inject, OnInit, untracked } from '@angular/core';
import { ADD_BUTTON, CommonModules } from '@view/lib/values';
import { GoodsDeliveryItemForm } from '../../../forms/goods-delivery-item.form';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { GoodsDeliveryModel, GoodsDeliveryTypeEnum } from '@domain/lib/purchase-and-orders';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { GoodsDeliveryItemSerialNumberComponent } from './goods-delivery-item-serial-number/goods-delivery-item-serial-number.component';
import { GoodsDeliveryItemListComponent } from '../../goods-delivery-item-list/goods-delivery-item-list.component';
import { GoodsDeliveryFacade } from '@state/lib/facade';
import { ClPanelAction } from '@sadad/component-lib/src/models';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { FormValidatorService } from '@view/lib/ui-services';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ClChipsComponent } from '@sadad/component-lib/src/lib/chips';
import { ClMessageService } from '@sadad/component-lib/src/services';
import { ClListBoxComponent } from '@sadad/component-lib/src/lib/list-box';
import { SerialNumberService } from '../../../services/serial-number/serial-number.service';

@Component({
  selector: 'purchase-goods-delivery-second-step',
  standalone: true,
  imports: [
    CommonModules,
    GoodsDeliveryItemSerialNumberComponent,
    GoodsDeliveryItemListComponent,
    HeadingComponent,
    ClDividerComponent,
    ClChipsComponent,
    ClListBoxComponent
  ],
  templateUrl: './goods-delivery-second-step.component.html',
})
export class GoodsDeliverySecondStepComponent extends BaseComponent<GoodsDeliveryModel> implements OnInit {
  readonly goodsDeliveryFacade = inject(GoodsDeliveryFacade);
  readonly #parentFormGroup = inject(FormGroupDirective);
  readonly #messageService = inject(ClMessageService);

  protected readonly httpContext = new HttpContext().set(SKIP_LOADING, true);
  protected readonly goodsDeliveryTypeEnum: typeof GoodsDeliveryTypeEnum = GoodsDeliveryTypeEnum;

  constructor(@Inject(ADD_BUTTON) public goodsAdd: ClPanelAction) {
    super();
    this.formGroup = this.#parentFormGroup.control.get("deliveryItemsList") as FormGroup<GoodsDeliveryItemForm>;

    effect(() => {
      const edit = this.goodsDeliveryFacade.goodsDeliveryStore.state$().editMode$();
      const selectedGoodsDelivery = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$();

      untracked(() => {
        if (edit && selectedGoodsDelivery.id && !selectedGoodsDelivery.ifDeliveryItemsLoaded) {
         this.goodsDeliveryFacade.updateSelectedGoodsDeliveryItemsListByDeliveryId(selectedGoodsDelivery.id)
       } else {
          this.formGroup.reset();
          this.formGroup.markAsUntouched();
       }
      });
    });
  }

  ngOnInit() {
    this.addFormControls();
  }

  addFormControls() {
    if (!this.formGroup.get('goodsId')) {
      this.formGroup.addControl('goodsId', new FormControl(null, {validators: [Validators.required]}));
    }
    if (!this.formGroup.get('goodsLabel')) {
      this.formGroup.addControl('goodsLabel', new FormControl);
    }
    if (!this.formGroup.get('goodsCode')) {
      this.formGroup.addControl('goodsCode', new FormControl);
    }
    if (!this.formGroup.get('serialType')) {
      this.formGroup.addControl('serialType', new FormControl);
    }
    if (!this.formGroup.get('isGoodsFloat')) {
      this.formGroup.addControl('isGoodsFloat', new FormControl);
    }
    if (!this.formGroup.get('countingUnitId')) {
      this.formGroup.addControl('countingUnitId', new FormControl);
    }
    if (!this.formGroup.get('countingUnitTitle')) {
      this.formGroup.addControl('countingUnitTitle', new FormControl({value: null, disabled: true}));
    }
    if (!this.formGroup.get('quantity')) {
      this.formGroup.addControl('quantity', new FormControl(null, {validators: [Validators.required, FormValidatorService.noWhitespace]}));
    }
    if (!this.formGroup.get('price')) {
      this.formGroup.addControl('price', new FormControl);
    }
    if (!this.formGroup.get('totalPrice')) {
      this.formGroup.addControl('totalPrice', new FormControl({value: 0, disabled: true}));
    }
    if (!this.formGroup.get('description')) {
      this.formGroup.addControl('description', new FormControl);
    }
    if (!this.formGroup.get('serialNumbers')) {
      this.formGroup.addControl('serialNumbers', new FormControl);
    }
    if (!this.formGroup.get('availableSerialNumbers')) {
      this.formGroup.addControl('availableSerialNumbers', new FormControl);
    }
  }

  setTotalPrice() {
    const totalPrice = Number(this.formGroup.get('quantity')?.value) * Number(this.formGroup.get('price')?.value);
    this.formGroup.get('totalPrice')?.setValue(totalPrice);
  }

  setSelectedGoods(event: any) {
    this.formGroup.get('goodsLabel')?.setValue(event['title']);
    this.formGroup.get('goodsCode')?.setValue(event['code']);
    this.formGroup.get('serialType')?.setValue(event['serialType']);
    this.formGroup.get('isGoodsFloat')?.setValue(event['isDecimal']);
    this.formGroup.get('countingUnitId')?.setValue(event['measurement']['id']);
    this.formGroup.get('countingUnitTitle')?.setValue(event['measurement']['title']);

    const [deliveryType, delivererId] = [this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$().deliveryType, this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$().delivererId];
    const [stockroomId, organizationId] = SerialNumberService.setAvailableInformaticsSerialNumbersListParams(deliveryType, delivererId);
    if (this.formGroup.get('serialType')?.value == 'INFORMATICS_SERIES' &&  (stockroomId || organizationId)) {
      this.goodsDeliveryFacade.updateAvailableInformaticsSerialNumbersList(this.formGroup.get('goodsId')?.value, stockroomId, organizationId);
    }

  }

  addGoodsToList() {
    this.formGroup?.markAllAsTouched();
    if(!SerialNumberService.validate(this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$().deliveryType,
                                    this.formGroup.get('serialType')?.value,
                                    this.formGroup.get('quantity')?.value,
                                    this.formGroup.get('serialNumbers')?.value?.length,
                                    this.formGroup.get('availableSerialNumbers')?.value?.length
      )
    ) {
      this.#messageService.add({
        type: 'error' ,
        detail: this.translate.instant('messages.serial-number-list-length-equal-to-goods-quantity'),
        closeable: true,
        lifeTime: 3000
      });
      return;
    }

    if (this.formGroup.valid) {
      // cacheClear['updateSelectedGoodsDeliveryItemsListByDeliveryId'].clear(); // todo
      const deliveryId = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$().id;
      this.goodsDeliveryFacade.updateItemsOfSelectedGoodsDelivery({deliveryId: deliveryId, ...this.formGroup.getRawValue()}, 'add');
      this.formGroup?.markAsUntouched();
      this.formGroup.reset();
    }
  }
}
