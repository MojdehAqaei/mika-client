import { Component, effect, inject, OnInit, untracked } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { ClChipsComponent } from '@sadad/component-lib/src/lib/chips';
import { FeatureFacade } from '@state/lib/facade';
import { ErrorLogger } from '@sadad/component-lib/src/decorators';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { FeatureForm } from '../../forms/feature.form';
import { FeatureModel, FeatureTypeEnum } from '@domain/lib/base-data';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'base-add-edit-feature',
  standalone: true,
  imports: [CommonModules, ClChipsComponent],
  templateUrl: './add-edit-feature.component.html',
  providers: [FeatureFacade]
})
export class AddEditFeatureComponent extends BaseComponent<FeatureModel> implements OnInit {

  public readonly featureFacade = inject(FeatureFacade);
  readonly #invokeService = inject(ActionInvokeService);

  goodsFeatureTypeEnum: typeof FeatureTypeEnum = FeatureTypeEnum;
  goodsFeatureTypeList!: ClSelectItem[];

  constructor() {
    super();
    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveOrUpdateGoodsFeature();
    });

    this.formGroup = this.fb.group<FeatureForm>({
      label: new FormControl(null, {nonNullable: true, validators: [Validators.required, FormValidatorService.noWhitespace]}),
      type: new FormControl(null, {nonNullable: true, validators: Validators.required}),
      isActive: new FormControl( true, {nonNullable: true}),
      values: new FormControl(null),
      description: new FormControl(null, {validators: [Validators.maxLength(500)]})
    });

    effect(() => {
      const edit = this.featureFacade.featureStore.state$().editMode$();
      const selectedFeature = this.featureFacade.featureStore.state$().selectedFeature$();

      untracked(() => {
        this.formGroup?.enable();
        if (edit) {
          this.formGroup.patchValue(<FeatureForm>selectedFeature);
          if (this.formGroup.get('type')?.value == FeatureTypeEnum.NUMBER) {
            this.formGroup.get('values')?.disable();
          }
        } else {
          this.formGroup?.reset();
        }
      });
    });
  }

  ngOnInit() {
    this.goodsFeatureTypeList = [
      { label: this.translate.instant('list'), value: FeatureTypeEnum.LIST },
      { label: this.translate.instant('number'), value: FeatureTypeEnum.NUMBER }
    ];
  }

  setValuesValidator() {
    if (this.formGroup.controls['type'].value == FeatureTypeEnum.LIST) {
      this.formGroup.controls['values'].setValidators([Validators.required]);
      this.formGroup.controls['values'].enable();
    } else {
      this.formGroup.controls['values'].clearValidators();
      this.formGroup.controls['values'].disable();
    }
    this.formGroup.controls['values'].updateValueAndValidity();
  }

  /**
   * Save Or Update Goods Feature
   */
  @ErrorLogger()
  saveOrUpdateGoodsFeature() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup?.markAsUntouched(); // resetting
      this.featureFacade.featureStore.state$().editMode$()
        ? this.featureFacade.updateFeature({ ...this.formGroup.value, id: this.featureFacade.featureStore.state$().selectedFeature$().id })
        : this.featureFacade.saveFeature(this.formGroup.value);
    }
  }

}
