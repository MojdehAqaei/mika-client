import { Component, effect, inject, input, InputSignal, OnInit } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { GoodsDeliveryModel, GoodsDeliveryStateEnum } from '@domain/lib/purchase-and-orders';
import { GoodsDeliveryForm } from '../../forms/goods-delivery.form';
import { FormControl, Validators } from '@angular/forms';
import { ClDatePickerComponent } from '@sadad/component-lib/src/lib/date-picker';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { GoodsDeliveryFacade } from '@state/lib/facade';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import {
  GoodsDeliveryDetailsPreviewComponent
} from '../add-edit-goods-delivery/goods-delivery-details-preview/goods-delivery-details-preview.component';

@Component({
  selector: 'purchase-change-goods-delivery-state',
  standalone: true,
  imports: [CommonModules, ClDatePickerComponent, ClDividerComponent, GoodsDeliveryDetailsPreviewComponent],
  templateUrl: './change-goods-delivery-state.component.html',
})
export class ChangeGoodsDeliveryStateComponent extends BaseComponent<GoodsDeliveryModel> implements OnInit {
  protected readonly goodsDeliveryFacade = inject(GoodsDeliveryFacade);
  readonly #invokeService = inject(ActionInvokeService);

  goodsDeliveryStateEnum: typeof  GoodsDeliveryStateEnum = GoodsDeliveryStateEnum;

  nextState: InputSignal<GoodsDeliveryStateEnum> = input<GoodsDeliveryStateEnum>(GoodsDeliveryStateEnum.INITIAL_SUBMIT);

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.changeState();
    });

    this.formGroup = this.fb.group<GoodsDeliveryForm>({
      sendDate: new FormControl,
      receiverFullName: new FormControl,
      sourceAdditionalComments: new FormControl,
      receiveDate: new FormControl,
      delivererFullName: new FormControl,
      destinationAdditionalComments: new FormControl,
    });

    effect(() => {
      this.formGroup.reset();
      const nextState = this.nextState();

      if (nextState == GoodsDeliveryStateEnum.SENT_FROM_SOURCE) {
        this.formGroup.get('receiveDate')?.clearValidators();
        this.formGroup.get('receiveDate')?.updateValueAndValidity();

        this.formGroup.get('delivererFullName')?.clearValidators();
        this.formGroup.get('delivererFullName')?.updateValueAndValidity();

        this.formGroup.get('sendDate')?.setValidators([Validators.required]);
        this.formGroup.get('sendDate')?.updateValueAndValidity();

        this.formGroup.get('receiverFullName')?.setValidators([Validators.required, FormValidatorService.noWhitespace]);
        this.formGroup.get('receiverFullName')?.updateValueAndValidity();

      } else if (nextState == GoodsDeliveryStateEnum.RECEIVED_AT_DESTINATION) {
        this.formGroup.get('sendDate')?.clearValidators();
        this.formGroup.get('sendDate')?.updateValueAndValidity();

        this.formGroup.get('receiverFullName')?.clearValidators();
        this.formGroup.get('receiverFullName')?.updateValueAndValidity();

        this.formGroup.get('receiveDate')?.setValidators([Validators.required]);
        this.formGroup.get('receiveDate')?.updateValueAndValidity();

        this.formGroup.get('delivererFullName')?.setValidators([Validators.required, FormValidatorService.noWhitespace]);
        this.formGroup.get('delivererFullName')?.updateValueAndValidity();
      }
    });
  }

  ngOnInit() {
    this.formGroup.markAsUntouched();
  }

  changeState() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const nextState = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$().nextState;
      const id = this.goodsDeliveryFacade.goodsDeliveryStore.state$().selectedGoodsDelivery$().id;
      this.goodsDeliveryFacade.updateDeliveryState({
        ...this.formGroup.value,
        id,
        nextState
      });
    }
  }
}
