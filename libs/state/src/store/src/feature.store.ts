import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { featureInitialState, FeatureState } from '../../state';
import { FeatureModel } from '@domain/lib/base-data';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class FeatureStore {
  #store = new Store<FeatureState>(featureInitialState);
  public readonly state$: Signal<FeatureState> = this.#store.state$.asReadonly();

  updateFeatures(goodsFeatures: FeatureModel[]) {
    this.#store.updateField('features$', goodsFeatures);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updateSelectedFeature(feature: FeatureModel) {
    this.#store.updateField('selectedFeature$', feature);
  }

  updatePageSize(size: number) {
    this.#store.updateField('pageSize$', size);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
  }

  updateTotal(total: number) {
    this.#store.updateField('total$', total);
  }

  updateSearchFilterLabels(labels: string[]) {
    this.#store.updateField('searchFilterLabels$', labels);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.#store.updateField('allowedActions$', actions);
  }
}
