import { Component, effect, inject, untracked } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonModules } from '@view/lib/values';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ClDatePickerComponent } from '@sadad/component-lib/src/lib/date-picker';
import { BaseComponent } from '@view/lib/components';
import { FiscalYearModel } from '@domain/lib/stockroom';
import { FiscalYearFacade } from '@state/lib/facade';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { FiscalYearForm } from '../../forms/fiscal-year.form';

@Component({
  selector: 'stockroom-add-fiscal-year',
  standalone: true,
  imports: [
    CommonModules,
    ClDatePickerComponent
  ],
  templateUrl: './add-fiscal-year.component.html',
})
export class AddFiscalYearComponent extends BaseComponent<FiscalYearModel> {
  public readonly fiscalYearFacade = inject(FiscalYearFacade);
  readonly #invokeService = inject(ActionInvokeService);

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateFiscalYear();
    });

    this.formGroup = this.fb.group<FiscalYearForm>({
      id: new FormControl,
      title: new FormControl('', { validators: [Validators.required, FormValidatorService.noWhitespace] }),
      startDate: new FormControl(null, { validators: [Validators.required] }),
      endDate: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl('', { validators: [FormValidatorService.noWhitespace] }),
    });

    effect(() => {
      const edit = this.fiscalYearFacade.fiscalYearStore.state$().editMode$();
      const selectedFiscalYear = this.fiscalYearFacade.fiscalYearStore.state$().selectedFiscalYear$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedFiscalYear);
        } else {
          this.formGroup.reset();
        }
      })
    });
  }

  @ErrorLogger()
  saveOrUpdateFiscalYear() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.fiscalYearFacade.fiscalYearStore.state$().editMode$()
        ? this.fiscalYearFacade.updateFiscalYear(this.formGroup.value)
        : this.fiscalYearFacade.saveFiscalYear(this.formGroup.value);
    }
  }
}
