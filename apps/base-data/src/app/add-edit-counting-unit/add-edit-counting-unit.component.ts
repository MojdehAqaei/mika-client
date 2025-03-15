import { Component, effect, inject, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { ClFormControlSchema } from '@sadad/component-lib/src/models';
import { ClFormGeneratorComponent } from '@sadad/component-lib/src/lib/form-generator';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { ClFormService } from '@sadad/component-lib/src/services';
import { CountingUnitFacade } from '@state/lib/facade';
import { BaseComponent } from '@view/lib/components';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { CountingUnitForm } from '../../forms/counting.unit.form';
import {
  CountingUnitGateway,
  CountingUnitModel,
} from '@domain/lib/base-data';
import { Validators } from '@angular/forms';
import { CountingUnitImplementationService } from '@api/lib/impl';


@Component({
  selector: 'base-add-edit-counting-unit',
  standalone: true,
  imports: [CommonModules, ClFormGeneratorComponent],
  templateUrl: './add-edit-counting-unit.component.html',
  providers: [
    { provide: CountingUnitGateway, useClass: CountingUnitImplementationService },
    ClFormService,
    CountingUnitFacade,
  ]
})
export class AddEditCountingUnitComponent extends BaseComponent<CountingUnitModel> {
  public readonly countingUnitFacade = inject(CountingUnitFacade);
  readonly #invokeService = inject(ActionInvokeService);
  formService = inject(ClFormService);

  formSchema: ClFormControlSchema[] = [
    {
      order: 1,
      inputTextType: 'text',
      name: 'title',
      label: this.translate.instant('base-data.counting-unit.title'),
      controlType: 'INPUT_TEXT',
      required: true,
      validators: [Validators.required, FormValidatorService.noWhitespace]
    },
    {
      order: 2,
      name: 'countingUnitType',
      label: this.translate.instant('base-data.counting-unit.type'),
      controlType: 'SELECT',
      keyFilter: 'pint',
      required: true,
      validators: [Validators.required],
      options: []
    },
    {
      order: 3,
      name: 'isActive',
      value: true,
      label: this.translate.instant('status'),
      controlType: 'INPUT_SWITCH',
      required: false,
      disabled: false
    }
  ];

  constructor() {
    super();

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateCountingUnit();
    });

    effect(() => {
      const edit = this.countingUnitFacade.countingUnitStore.state$().editMode$();
      const selectedCountingUnit = this.countingUnitFacade.countingUnitStore.state$().selectedCountingUnit$();
      const countingUnitTypeOptions = this.countingUnitFacade.countingUnitStore.state$().countingUnitTypes$();

      untracked(() => {
        // @ts-ignore
        this.formSchema.find(f => f.name == 'countingUnitType').options = countingUnitTypeOptions;
        this.formService.form?.enable();
        if (edit) {
          this.formService.form?.patchValue(<CountingUnitForm>selectedCountingUnit);
        } else {
          this.formService.form?.reset();
          this.formService.form?.get('isActive')?.reset(true);
        }
      });
    });
  }

  /**
   * Save Or Update Counting Unit
   */
  @ErrorLogger()
  saveOrUpdateCountingUnit() {
    this.formService.form?.markAllAsTouched();
    if (this.formService.form?.valid) {
      this.formService.form?.disable();
      this.formService.form?.markAsUntouched(); // resetting
      this.countingUnitFacade.countingUnitStore.state$().editMode$()
        ? this.countingUnitFacade.updateCountingUnit(
          {
            id: this.countingUnitFacade.countingUnitStore.state$().selectedCountingUnit$().id,
            ...this.formService.form?.value
          }
        )
        : this.countingUnitFacade.saveCountingUnit(this.formService.form?.value)
    }
  }
}
