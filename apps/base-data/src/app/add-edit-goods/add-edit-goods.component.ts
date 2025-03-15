import { Component, effect, Inject, inject, untracked } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import {
  FeatureTypeEnum,
  GoodsFeatureModel,
  GoodsGroupFeatureModel,
  GoodsModel,
  SERIAL_TYPE,
  serialTypeOptions
} from '@domain/lib/base-data';
import { GoodsFacade, GoodsGroupFeatureFacade } from '@state/lib/facade';
import { ActionInvokeService, FormValidatorService } from '@view/lib/ui-services';
import { GoodsForm } from '../../forms/goods.form';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { GoodsFeatureForm } from '../../forms/goods-feature.form';

@Component({
  selector: 'base-add-edit-goods',
  standalone: true,
  imports: [CommonModules, ClKeyFilterDirective],
  providers: [
    {provide: SERIAL_TYPE, useValue: serialTypeOptions},
    GoodsFacade,
    GoodsGroupFeatureFacade
  ],
  templateUrl: './add-edit-goods.component.html',
})
export class AddEditGoodsComponent extends BaseComponent<GoodsModel> {
  readonly goodsFacade = inject(GoodsFacade);
  readonly goodsGroupFeatureFacade = inject(GoodsGroupFeatureFacade);
  readonly #invokeService = inject(ActionInvokeService);

  httpContext = new HttpContext().set(SKIP_LOADING, true);

  constructor(@Inject(SERIAL_TYPE) public serialTypeOptions: ClSelectItem[]) {
    super();

    this.formGroup = this.fb.group<GoodsForm>({
      id: new FormControl,
      goodsGroupId: new FormControl(null, {validators: [Validators.required]}),
      goodsGroupLabel: new FormControl,
      accessTypeId: new FormControl(null, {validators: [Validators.required]}),
      accessTypeTitle: new FormControl,
      serialType: new FormControl(null, {validators: [Validators.required]}),
      barcode: new FormControl,
      countingUnitId: new FormControl(null, {validators: [Validators.required]}),
      countingUnitTitle: new FormControl,
      isFloat: new FormControl(false, {nonNullable: true}),
      isActive: new FormControl(true, {nonNullable: true}),
      description: new FormControl(null, {validators: Validators.maxLength(500)}),
      features: this.fb.array<GoodsGroupFeatureModel>([]),
    });

    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(
      () => {
        this.saveOrUpdateGoods();
      }
    );

    effect(() => {
      const edit = this.goodsFacade.goodsStore.state$().editMode$();
      const selectedGoods = this.goodsFacade.goodsStore.state$().selectedGoods$();
      const goodsGroupFeatures = this.goodsGroupFeatureFacade.goodsGroupStore.state$().goodsGroupFeatures$();

      untracked(() => {
        if (edit) {
          this.formGroup.patchValue(selectedGoods);
          this.formGroup.get('goodsGroupId')?.disable();
          // @ts-ignore
          this.addFeatures(selectedGoods.features, true);
        } else {
          if (!goodsGroupFeatures) {
            this.features.clear();
            this.formGroup.reset();
            this.formGroup.get('goodsGroupId')?.enable();
          }
        }

        if (goodsGroupFeatures?.length) {
          this.addFeatures(goodsGroupFeatures, false);
        }
      });
    });
  }

  getFeatureListByGoodsGroupId(event: any) {
    this.features.clear(); // resetting
    this.formGroup.get('goodsGroupLabel')?.setValue(`${event.title} ${event.code}`);
    this.goodsGroupFeatureFacade.getGoodsGroupFeaturesById(event.id);
  }

  get features() {
    return this.formGroup.controls['features'] as FormArray;
  }

  setSelectedOptionLabel(event: number, index: number) {
    const featureValues = this.features.controls[index].get('featureValues')?.value;
    if (this.features.controls?.length && Array.isArray(featureValues)) {
      const label = featureValues.find(v => v.value == event)?.label;
      this.features.controls[index].get('label')?.setValue(label);
    }
  }

  setAccessTypeTitle(event: any) {
    this.formGroup.get('accessTypeTitle')?.setValue(event?.title);
  }


  /**
   * edit mode == true then features will have been of type GoodsFeatureModel[]
   * edit mode == false then features will have been of type GoodsGroupFeatureModel[]
   * */
  addFeatures(features: GoodsGroupFeatureModel[] & GoodsFeatureModel[], edit: boolean) {
    this.features.clear();

    features?.forEach((each: GoodsGroupFeatureModel & GoodsFeatureModel, index) => {
        const featureGroup = this.fb.group<GoodsFeatureForm>({
          id: new FormControl(edit ? each.id : null),
          goodsGroupFeatureId: new FormControl(edit ? each.goodsGroupFeatureId: each.id),
          featureId: new FormControl(each.featureId),
          featureLabel: new FormControl(each.featureLabel),
          featureValues: new FormControl(each.featureValues),
          value: new FormControl(edit ? each.value : null,
            {validators: each.featureType == FeatureTypeEnum.LIST ? each.required || each.goodsGroupFeatureRequired ? [Validators.required] : null : null}
          ),
          label: new FormControl(edit ? each.label : null,
            {validators: each.featureType == FeatureTypeEnum.NUMBER ? each.required || each.goodsGroupFeatureRequired ? [Validators.required, FormValidatorService.noWhitespace] : null : null}
          ),
          featureType: new FormControl(each.featureType),
          description: new FormControl(each.description),
          goodsGroupFeatureRequired: new FormControl(edit ? each.goodsGroupFeatureRequired : each.required),
          goodsGroupFeatureOrder: new FormControl(edit ? each.goodsGroupFeatureOrder : each.order),
        });

        this.features.push(featureGroup);
      });
  }

  saveOrUpdateGoods() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      this.formGroup?.markAsUntouched(); // resetting
      this.goodsFacade.goodsStore.state$().editMode$()
        ? this.goodsFacade.updateGoods(this.formGroup.value)
        : this.goodsFacade.saveGoods(this.formGroup.value);
    }
  }
}
