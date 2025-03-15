import { Injectable, Signal } from '@angular/core';
import { Store } from '../store';
import { goodsGroupInitialState, GoodsGroupState } from '../../state';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { GoodsGroupFeatureModel, GoodsGroupModel } from '@domain/lib/base-data';

@Injectable()
export class GoodsGroupStore {
  #store = new Store<GoodsGroupState>(goodsGroupInitialState);
  public readonly state$: Signal<GoodsGroupState> = this.#store.state$.asReadonly();

  updateGoodsGroupTree(goodsTreeData: ClTreeNode<GoodsGroupModel>[]) {
    this.#store.updateField('goodsGroupTreeData$', goodsTreeData);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updateEditMode(isEditMode: boolean) {
    this.#store.updateField('editMode$', isEditMode);
  }

  updateSelectedGoodsGroup(goods: ClTreeNode<GoodsGroupModel>) {
    this.#store.updateField('selectedGoodsGroup$', goods);
  }

  updateSubgroupCode(code: string) {
    this.#store.updateField('goodsSubgroupGeneratedCode$', code);
  }

  updateSGoodsGroupFeatures(goodsGroupFeatures: GoodsGroupFeatureModel[] | null) {
    this.#store.updateField('goodsGroupFeatures$', goodsGroupFeatures);
  }

}
