import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGroupFeatureModel } from '../model/goods-group-feature.model';
import { GoodsGroupFeatureGateway } from '../gateway/goods-group-feature.gateway';

export class SaveGoodsGroupFeaturesUseCase implements UseCase<GoodsGroupFeatureModel[], GoodsGroupFeatureModel[]> {
  readonly #goodsGroupFeatureGateway = inject(GoodsGroupFeatureGateway);

  execute(params: GoodsGroupFeatureModel[]): Observable<GoodsGroupFeatureModel[]> {
    params.forEach((each, index) => {
      // each.order = index + 1;
      if (each.id == null) {
        delete each.id;
      }
    });
    return this.#goodsGroupFeatureGateway.saveGoodsGroupFeatures(params);
  }
}
