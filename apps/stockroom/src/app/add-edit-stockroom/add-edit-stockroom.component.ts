import { Component, effect, inject, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { ActionInvokeService } from '@view/lib/ui-services';
import { StockroomModel } from '@domain/lib/stockroom';
import { StockroomFacade } from '@state/lib/facade';
import { StockroomForm } from '../../forms/stockroom.form';
import { FormControl, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';

@Component({
  selector: 'stockroom-add-edit-stockroom',
  standalone: true,
  imports: [CommonModules],
  templateUrl: './add-edit-stockroom.component.html'
})
export class AddEditStockroomComponent extends BaseComponent<StockroomModel> {
  readonly stockroomFacade = inject(StockroomFacade);
  readonly #invokeService = inject(ActionInvokeService);

  httpContext = new HttpContext().set(SKIP_LOADING, true);

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateStockroom();
    });

    this.formGroup = this.fb.group<StockroomForm>({
      id: new FormControl,
      organizationId: new FormControl(null, {validators: [Validators.required]}),
      organizationName: new FormControl('', {nonNullable: true}),
      inventoryTypeId: new FormControl(null, {validators: [Validators.required]}),
      inventoryTypeTitle: new FormControl('', {nonNullable: true}),
      code: new FormControl({value: null, disabled: true}, {validators: [Validators.required]}),
      title: new FormControl({value: null, disabled: true}, {validators: [Validators.required]}),
      isActive: new FormControl(true, {nonNullable: true, validators: [Validators.required]}),
      description: new FormControl
    });

    effect(() => {
      const edit = this.stockroomFacade.stockroomStore.state$().editMode$();
      const selectedStockroom = this.stockroomFacade.stockroomStore.state$().selectedStockroom$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedStockroom);
          this.formGroup.get('organizationId')?.disable();
          this.formGroup.get('inventoryTypeId')?.disable();
        } else {
          this.formGroup.reset();
          this.formGroup.get('organizationId')?.enable();
          this.formGroup.get('inventoryTypeId')?.enable();
        }
      });
    });
  }

  setOrganizationName(event: any) {
    this.formGroup.get('organizationName')?.setValue((event.typeName || '') + ' ' + (event.name || ''));
  }

  setInventoryTypeTitle(event: any) {
    this.formGroup.get('inventoryTypeTitle')?.setValue(event.title);
  }

  setTitle(event: any) {
    const title =  this.formGroup.get('organizationName')?.value + ' - ' + this.formGroup.get('inventoryTypeTitle')?.value;
    this.formGroup.get('title')?.setValue(title);
  }

  setCode(event: any) {
    const fourDigitNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const code = event.code?.trim() + +fourDigitNumber;
    this.formGroup.get('code')?.setValue(code);
  }

  saveOrUpdateStockroom() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.stockroomFacade.stockroomStore.state$().editMode$()
        ? this.stockroomFacade.updateStockroom(this.formGroup.getRawValue())
        : this.stockroomFacade.saveStockroom(this.formGroup.getRawValue())
    }
  }
}
