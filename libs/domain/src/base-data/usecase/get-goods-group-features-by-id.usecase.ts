import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGroupFeatureGateway } from '../gateway/goods-group-feature.gateway';
import { GoodsGroupFeatureModel } from '../model/goods-group-feature.model';

export class GetGoodsGroupFeaturesByIdUseCase implements UseCase<number, GoodsGroupFeatureModel[]> {
  readonly #goodsGroupFeatureGateway = inject(GoodsGroupFeatureGateway);
  execute(id: number): Observable<GoodsGroupFeatureModel[]> {
    return this.#goodsGroupFeatureGateway.getGoodsGroupFeaturesById(id);
  }
}
