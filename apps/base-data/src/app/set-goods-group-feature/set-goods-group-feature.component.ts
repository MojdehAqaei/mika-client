import { Component, effect, Inject, inject, untracked } from '@angular/core';
import { ADD_BUTTON, CommonModules, ERROR_ALERT, INFO_ALERT } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import {
  GoodsGroupFeatureModel,
  FeatureGateway,
  FeatureModel,
  deleteFeatureUseCaseProvider,
  getFeatureByIdUseCaseProvider,
  SaveFeatureUseCaseProvider,
  SearchFeaturesUseCaseProvider,
  UpdateFeatureUseCaseProvider,
} from '@domain/lib/base-data';
import { FeatureFacade, GoodsGroupFacade, GoodsGroupFeatureFacade } from '@state/lib/facade';
import { FeatureImplementationService } from '@api/lib/impl';
import { GoodsGroupFeatureForm } from '../../forms/goods-group-feature.form';
import { FormArray, FormControl } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ClPaginatorComponent } from '@sadad/component-lib/src/lib/paginator';
import { ActionInvokeService } from '@view/lib/ui-services';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';
import { ClMessage, ClPanelAction } from '@sadad/component-lib/src/models';
import { HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';


@Component({
  selector: 'base-set-goods-group-feature',
  standalone: true,
  imports: [CommonModules, CdkDrag, CdkDropList, ClPaginatorComponent, ClAlertMessagesComponent],
  providers: [
    { provide: FeatureGateway, useClass: FeatureImplementationService },
    SearchFeaturesUseCaseProvider,
    getFeatureByIdUseCaseProvider,
    SaveFeatureUseCaseProvider,
    UpdateFeatureUseCaseProvider,
    deleteFeatureUseCaseProvider,
    GoodsGroupFeatureFacade,
    FeatureFacade,
    GoodsGroupFacade
  ],
  templateUrl: './set-goods-group-feature.component.html',
  styleUrl: './set-goods-group-feature.component.scss',
})
export class SetGoodsGroupFeatureComponent extends BaseComponent<GoodsGroupFeatureModel> {

  public readonly goodsGroupFacade = inject(GoodsGroupFacade);
  public readonly goodsGroupFeatureFacade = inject(GoodsGroupFeatureFacade);
  public readonly featureFacade = inject(FeatureFacade);

  readonly #invokeService = inject(ActionInvokeService);

  selectedFeature!: FeatureModel & { title?: string};
  rows: number = 10;
  currentPage: number = 1;
  first: number = 0;
  httpContext = new HttpContext().set(SKIP_LOADING, true);

  constructor(@Inject(ADD_BUTTON) public featureAdd: ClPanelAction,
              @Inject(ERROR_ALERT) public errorAlert: ClMessage,
              @Inject(INFO_ALERT) public infoAlert: ClMessage) {
    super();

    infoAlert.summary = this.translate.instant('messages.canSortByDragging');

    featureAdd.command = () => this.createListFormGroup(this.selectedFeature, false);

    /** did it like below because takeUntilDestroyed() can only be used within an injection context */
    this.destroyObservable(this.#invokeService.getMethodInvocation()).subscribe(() => {
      this.saveGoodsGroupFeature();
    });

    this.formGroup = this.fb.group({
      list: this.fb.array<GoodsGroupFeatureForm>([])
    });

    effect(() => {
      const goodsGroupFeatures = this.goodsGroupFeatureFacade.goodsGroupStore.state$().goodsGroupFeatures$();

      untracked(() => {
        if (goodsGroupFeatures != null) {
          this.formGroup?.markAsUntouched();
          this.featureForm.clear();
          goodsGroupFeatures.forEach(f => this.createListFormGroup(f, true));
        }
      })
    });
  }

  get featureForm() {
    return this.formGroup.get('list') as FormArray;
  }

  createListFormGroup(item: FeatureModel & { title?: string } & GoodsGroupFeatureModel, editMode: boolean) {
    const isDuplicated = this.featureForm.value?.some((i: FeatureModel & { title?: string } & GoodsGroupFeatureModel) => i?.featureId == item?.id);
    if (item && !isDuplicated) {
      const form = this.fb.group<GoodsGroupFeatureForm>({
        id: new FormControl(editMode ? item?.id : null),
        featureId: new FormControl(editMode ? item.featureId : item.id),
        goodsGroupId: new FormControl(this.goodsGroupFacade.goodsGroupStore.state$().selectedGoodsGroup$()?.data?.id),
        featureLabel: new FormControl(editMode ? item.featureLabel : item.title),
        order: new FormControl(editMode ? item.order : this.featureForm.controls?.length + 1),
        required: new FormControl({ value: editMode ? item.required : true, disabled: false })
      });
      this.featureForm.push(form);
    }

    this.sortFormArray();
  }

  sortFormArray() {
    let array = this.featureForm.value;
    array.sort((a: any, b: any) => a.order - b.order);
    this.featureForm.patchValue(array)
  }

  page(event: { rows: number, first: number, page: number }) {
    this.first = event.first;
    this.rows = event.rows;
    this.currentPage = event.page;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.featureForm.controls, event.previousIndex, event.currentIndex);
    this.featureForm.controls.forEach((form, index) => {
      form.get('order')?.setValue(index+1);
    });
  }

  addSelectedFeatureToGoodsGroupFeatures(item: FeatureModel & { title?: string}) {
    this.selectedFeature = item;
  }

  deleteRow(featureId?: number) {
    const list = this.featureForm.value;
    const index = list.findIndex((i: GoodsGroupFeatureForm) => i.featureId == featureId);
    if (index > -1) {
      for (let i = index + 1; i < list.length; i++) {
        this.featureForm.controls[i].get('order')?.setValue(i);
        list[i].order = i;
      }
      this.featureForm.controls.splice(index, 1);
      list.splice(index, 1);
      this.featureForm.patchValue(list);
      this.goodsGroupFeatureFacade.updateGoodsGroupFeatures(null); // resetting
    }
  }

  saveGoodsGroupFeature() {
    this.formGroup?.markAllAsTouched();

    if (this.featureForm.value?.length) {
      this.errorAlert.summary = '';
      this.goodsGroupFeatureFacade.saveGoodsGroupFeatures(this.featureForm.value);
    } else {
      this.errorAlert.summary = this.translate.instant('messages.nothingSelected');
    }
  }
}
