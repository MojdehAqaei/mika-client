import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { debounceTime, Observable } from 'rxjs';
import { GoodsGateway } from '../gateway/goods.gateway';
import { GoodsModel } from '../model/goods.model';

export class GetActiveGoodsBySearchKeyUseCase implements UseCase<string, GoodsModel[]> {
  readonly #goodsGateway = inject(GoodsGateway);
  execute(key: string): Observable<GoodsModel[]> {
    return this.#goodsGateway.searchByKey(key).pipe(debounceTime(5000));
  }
}
