import { Component, effect, inject, Input, output, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { GoodsDeliveryInitialStepComponent } from './goods-delivery-initial-step/goods-delivery-initial-step.component';
import { GoodsDeliverySecondStepComponent } from './goods-delivery-second-step/goods-delivery-second-step.component';
import { GoodsDeliveryDetailsPreviewComponent } from './goods-delivery-details-preview/goods-delivery-details-preview.component';
import { BaseComponent } from '@view/lib/components';
import {
  GoodsDeliveryItemModel,
  GoodsDeliveryModel,
  GoodsDeliveryStateEnum,
  GoodsDeliveryTypeEnum
} from '@domain/lib/purchase-and-orders';
import { ClDatePickerComponent } from '@sadad/component-lib/src/lib/date-picker';
import { ClStepItem } from '@sadad/component-lib/src/models';
import { GoodsDeliveryFacade } from '@state/lib/facade';
import { ClStepsComponent } from '@sadad/component-lib/src/lib/steps';
import { GoodsDeliveryForm } from '../../forms/goods-delivery.form';
import { GoodsDeliveryItemForm } from '../../forms/goods-delivery-item.form';

@Component({
  selector: 'purchase-add-edit-goods-delivery',
  standalone: true,
  imports: [
    CommonModules,
    ClDatePickerComponent,
    ClStepsComponent,
    GoodsDeliveryInitialStepComponent,
    GoodsDeliverySecondStepComponent,
    GoodsDeliveryDetailsPreviewComponent
  ],
  templateUrl: './add-edit-goods-delivery.component.html',
})
export class AddEditGoodsDeliveryComponent extends BaseComponent<GoodsDeliveryModel> {
  readonly goodsDeliveryFacade = inject(GoodsDeliveryFacade);

  @Input() activeIndex: number = 0;
  steps!: ClStepItem[];

  stepChange = output<number>();


  constructor() {
    super();

    this.formGroup = this.fb.group({
      initialStep: this.fb.group<GoodsDeliveryForm>({}),
      deliveryItemsList: this.fb.group<GoodsDeliveryItemForm>({})
    });

    this.steps = [
      {label: this.translate.instant('purchase-and-orders.goods-delivery.saveDelivery'), status: false},
      {label: this.translate.instant('purchase-and-orders.goods-delivery.saveGoodsDetail'), status: false},
      {label: this.translate.instant('view-and-send'), status: false}
    ];

    effect(() => {
      const isStepValid = this.goodsDeliveryFacade.goodsDeliveryStore.state$().isFormStepValid$();

      untracked(() => {
        // this.steps[this.activeIndex].status = isStepValid;
        if (!isStepValid && this.activeIndex > 0) {
          this.activeIndex--;
        }
      });
    });
  }

  saveOrUpdateGoodsDelivery() {
    let delivery: GoodsDeliveryModel = {};
    let deliveryItems: GoodsDeliveryItemModel[] = [];
    let isValid: boolean = false;
    // this.goodsDeliveryFacade.toggleFormStepValidity(false);

    switch (this.activeIndex) {
      case 0:
        this.formGroup?.markAllAsTouched();
        if (this.formGroup.get('initialStep')?.valid) {
          delivery = this.formGroup.get('initialStep')?.getRawValue();
          isValid = true;
        }
        break;
      case 1:
        if (this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$()?.deliveryItemsList?.length) {
          deliveryItems = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$()?.deliveryItemsList || [];
          isValid = true;
        }
        break;
      case 2:
      default:
        //
        break;
    }
    if (isValid) {
      this.steps[this.activeIndex].status = true;
      this.goodsDeliveryFacade.goodsDeliveryStore.state$().editMode$()
        ? this.activeIndex == 0
          ? this.goodsDeliveryFacade.updatedGoodsDelivery(delivery)
          : this.goodsDeliveryFacade.updateGoodsDeliveryItems(deliveryItems)
        : this.activeIndex == 0
          ? this.goodsDeliveryFacade.savedGoodsDelivery(delivery)
          : this.goodsDeliveryFacade.updateGoodsDeliveryItems(deliveryItems);

      this.formGroup.markAsUntouched();
    }
  }

  changeStateToReadyForDelivery() {
    const delivery = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$();
    switch (delivery.deliveryType) {
      case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION:
      case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_INVENTORY:
        this.goodsDeliveryFacade.updateDeliveryState({id: delivery.id, nextState: GoodsDeliveryStateEnum.SENT_FROM_SOURCE});
        break;
      case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION:
      case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY:
      case GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION:
      case GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY:
      case GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY:
        this.goodsDeliveryFacade.updateDeliveryState({id: delivery.id, nextState: GoodsDeliveryStateEnum.READY_FOR_DELIVERY});
        break;
      default:
        break;
    }

  }

  closeTheDialog() {
    this.goodsDeliveryFacade.toggleDialogVisibility(false);
  }
}
