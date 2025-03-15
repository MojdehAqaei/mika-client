import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGateway } from '../gateway/goods.gateway';
import { GoodsModel } from '../model/goods.model';

export class GetGoodsUseCase implements UseCase<GoodsModel, GoodsModel[]> {
  readonly #goodsGateway = inject(GoodsGateway);
  execute(filters: GoodsModel): Observable<GoodsModel[]> {
    return this.#goodsGateway.filterAll(filters);
  }
}
