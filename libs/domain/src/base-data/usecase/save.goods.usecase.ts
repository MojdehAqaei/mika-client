import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { GoodsGateway } from '../gateway/goods.gateway';
import { Observable } from 'rxjs';
import { GoodsModel } from '../model/goods.model';

export class SaveGoodsUseCase implements UseCase<GoodsModel, GoodsModel> {
  readonly #goodsGateway = inject(GoodsGateway);

  execute(params: GoodsModel): Observable<GoodsModel> {
    delete params.id;
    delete params.goodsGroupLabel;
    return this.#goodsGateway.create(params);
  }
}
