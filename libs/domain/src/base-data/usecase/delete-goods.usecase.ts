import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsGateway } from '../gateway/goods.gateway';

export class DeleteGoodsUseCase implements UseCase<number, null> {
  readonly #goodsGateway = inject(GoodsGateway);
  execute(id: number): Observable<null> {
    return this.#goodsGateway.deleteById(id);
  }
}
