import { Component, effect, inject, untracked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderStateEnum, PURCHASE_Method, PURCHASE_SCALE, PURCHASE_STEPS_TYPE, purchaseMethodOptions, purchaseScaleOptions, PurchaseStepsModel, PurchaseStepsStateEnum, purchaseStepsTypeOptions } from '@domain/lib/purchase-and-orders';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ClDatePickerComponent } from '@sadad/component-lib/src/lib/date-picker';
import { ClConfirmation, ClSelectItem } from '@sadad/component-lib/src/models';
import { PurchaseStepsFacade } from '@state/lib/facade';
import { BaseComponent } from '@view/lib/components';
import { ActionInvokeService } from '@view/lib/ui-services';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { PurchaseStepsForm } from '../../forms/purchase-steps.form';

@Component({
  selector: 'purchase-add-edit-purchase-steps',
  standalone: true,
  imports: [CommonModules, ClDatePickerComponent],
  templateUrl: './add-edit-purchase-steps.component.html',
  providers: [
    { provide: PURCHASE_Method, useValue: purchaseMethodOptions },
    { provide: PURCHASE_SCALE, useValue: purchaseScaleOptions },
    { provide: PURCHASE_STEPS_TYPE, useValue: purchaseStepsTypeOptions },
  ]
})
export class AddEditPurchaseStepsComponent extends BaseComponent<PurchaseStepsModel> {
  readonly purchaseStepsFacade = inject(PurchaseStepsFacade);
  readonly confirmationConfig = inject<ClConfirmation>(CONFIRMATION_SERVICE_CONFIG);

  readonly methodOptions = inject<ClSelectItem[]>(PURCHASE_Method);
  readonly scaleOptions = inject<ClSelectItem[]>(PURCHASE_SCALE);
  readonly purchaseTypeOptions = inject<ClSelectItem[]>(PURCHASE_STEPS_TYPE);
  readonly #invokeService = inject(ActionInvokeService);
  constructor() {
    super();
    this.purchaseStepsFacade.updateOrderListPerInvoice(OrderStateEnum.WAIT_FOR_BUY);
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdatePurchaseSteps();
    });

    this.formGroup = new FormGroup<PurchaseStepsForm>({
      id: new FormControl,
      order: new FormControl(null, { nonNullable: true }),
      date: new FormControl(new Date(), [Validators.required]),
      purchaseStepNumber: new FormControl(null, [Validators.required]),
      purchaseStepType: new FormControl(null, [Validators.required]),
      purchaseMethod: new FormControl(null, [Validators.required]),
      purchaseScale: new FormControl(null, [Validators.required]),
      state: new FormControl(PurchaseStepsStateEnum.INITIAL_SUBMIT, { nonNullable: true }),
      description: new FormControl,
    });

    effect(() => {
      const edit = this.purchaseStepsFacade.purchaseStepsStore.state$().editMode$();
      const selectedPurchaseSteps = this.purchaseStepsFacade.purchaseStepsStore.state$().selectedPurchaseSteps$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedPurchaseSteps);
        }
      })
    });
  }

  @ErrorLogger()
  saveOrUpdatePurchaseSteps() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.purchaseStepsFacade.purchaseStepsStore.state$().editMode$()
        ? this.purchaseStepsFacade.updatedPurchaseSteps(this.formGroup.value)
        : this.purchaseStepsFacade.savedPurchaseSteps(this.formGroup.value);
    }
  }
}
