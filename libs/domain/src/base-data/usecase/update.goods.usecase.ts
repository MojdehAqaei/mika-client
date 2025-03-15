import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGateway } from '../gateway/goods.gateway';
import { GoodsModel } from '../model/goods.model';
import { UseCase } from '../../use-case';

export class UpdateGoodsUseCase implements UseCase<GoodsModel, GoodsModel> {
  readonly #goodsGateway = inject(GoodsGateway);

  execute(params: GoodsModel): Observable<GoodsModel> {
    delete params.goodsGroupLabel;
    return this.#goodsGateway.update(params);
  }
}
