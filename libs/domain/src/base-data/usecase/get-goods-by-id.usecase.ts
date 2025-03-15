import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodsGateway } from '../gateway/goods.gateway';
import { GoodsModel } from '../model/goods.model';

export class GetGoodsByIdUseCase implements UseCase<number, GoodsModel> {
  readonly #goodsGateway = inject(GoodsGateway);
  execute(id: number): Observable<GoodsModel> {
    return this.#goodsGateway.read(id);
  }
}
