import { inject, Injectable } from '@angular/core';
import { GoodsGroupStore } from '../../store';
import {
  GetGoodsGroupFeaturesByIdUseCase,
  GoodsGroupFeatureModel,
  SaveGoodsGroupFeaturesUseCase
} from '@domain/lib/base-data';


@Injectable()
export class GoodsGroupFeatureFacade {
  public goodsGroupStore = inject(GoodsGroupStore);
  readonly #getGoodsGroupFeaturesByIdUseCase = inject(GetGoodsGroupFeaturesByIdUseCase);
  readonly #saveGoodsGroupFeaturesUseCase = inject(SaveGoodsGroupFeaturesUseCase);

  constructor() {
  }


  /**
   * Get Goods Group Features By Id
   * @param id
   */
  getGoodsGroupFeaturesById(id: number) {
    this.#getGoodsGroupFeaturesByIdUseCase.execute(id).subscribe(res => {
      this.goodsGroupStore.updateSGoodsGroupFeatures(res);
    });
  }


  /**
   * Update Goods Group Features
   */
  updateGoodsGroupFeatures(goodsGroupFeatures: GoodsGroupFeatureModel[] | null) {
    this.goodsGroupStore.updateSGoodsGroupFeatures(goodsGroupFeatures);
  }


  /**
   * Save Goods Group Features
   * @param list
   */
  saveGoodsGroupFeatures(list: GoodsGroupFeatureModel[]) {
    this.goodsGroupStore.updateDialogLoading(true);
    this.#saveGoodsGroupFeaturesUseCase.execute(list).subscribe({
      next: (res) => {
        this.goodsGroupStore.updateDialogLoading(false);
        this.goodsGroupStore.updateDialogVisibility(false);
      },
      error: () => {
        this.goodsGroupStore.updateDialogLoading(false);
      }
    });
  }
}
