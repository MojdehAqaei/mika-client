import { Component, effect, inject, Inject, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import {
  FISCAL_YEAR_STATUS,
  FiscalYearPerStockroomModel,
  FiscalYearStatusEnum,
  fiscalYearStatusOptions
} from '@domain/lib/stockroom';
import { BaseComponent } from '@view/lib/components';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { FiscalYearPerStockroomFacade } from '@state/lib/facade';
import { ActionInvokeService } from '@view/lib/ui-services';
import { FiscalYearPerStockroomForm } from '../../forms/fiscal-year-per-stockroom.form';
import { FormControl, Validators } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { EndpointsEnum } from '@view/lib/data-types';

@Component({
  selector: 'stockroom-add-edit-fiscal-year-per-stockroom',
  standalone: true,
  imports: [CommonModules],
  providers: [
    {provide: FISCAL_YEAR_STATUS, useValue: fiscalYearStatusOptions},
  ],
  templateUrl: './add-edit-fiscal-year-per-stockroom.component.html',
})
export class AddEditFiscalYearPerStockroomComponent extends BaseComponent<FiscalYearPerStockroomModel>{
  readonly fiscalYearPerStockroomFacade = inject(FiscalYearPerStockroomFacade);
  readonly #invokeService = inject(ActionInvokeService);

  httpContext = new HttpContext().set(SKIP_LOADING, true);
  endpointsEnum: typeof EndpointsEnum = EndpointsEnum;

  constructor( @Inject(FISCAL_YEAR_STATUS) public fiscalYearStatusOptions: ClSelectItem[]) {
    super();


    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateFiscalYearPerStockroom();
    });

    this.formGroup = this.fb.group<FiscalYearPerStockroomForm>({
      id: new FormControl,
      fiscalYearId: new FormControl(null, {validators: [Validators.required]}),
      fiscalYearTitle: new FormControl,
      stockroomId: new FormControl(null, {validators: [Validators.required]}),
      stockroomTitle: new FormControl,
      state: new FormControl({ value: FiscalYearStatusEnum.ACTIVE, disabled: true }, {nonNullable: true, validators: [Validators.required]})
    });

    effect(() => {
      const edit = this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().editMode$();
      const selectedFiscalYearPerStockroom = this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().selectedFiscalYearPerStockroom$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedFiscalYearPerStockroom);
          this.formGroup.get('state')?.enable();
        } else {
          this.formGroup.reset();
          this.formGroup.get('state')?.disable();
        }
      });
    });
  }

  saveOrUpdateFiscalYearPerStockroom() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.fiscalYearPerStockroomFacade.fiscalYearPerStockroomStore.state$().editMode$()
        ? this.fiscalYearPerStockroomFacade.updateFiscalYearPerStockroom(this.formGroup.value)
        : this.fiscalYearPerStockroomFacade.saveFiscalYearPerStockroom(this.formGroup.getRawValue());
    }
  }
}
