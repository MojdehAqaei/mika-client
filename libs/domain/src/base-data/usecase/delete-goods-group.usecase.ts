import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsGroupGateway } from '../gateway/goods.group.gateway';

export class DeleteGoodsGroupUseCase implements UseCase<number, null> {
  readonly #goodsGroupDataGateway = inject(GoodsGroupGateway);
  execute(id: number): Observable<null> {
    return this.#goodsGroupDataGateway.deleteById(id);
  }
}
