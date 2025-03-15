import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsGroupGateway } from '../gateway/goods.group.gateway';


export class GenerateGoodsGroupCodeUseCase implements UseCase<string, string> {
  readonly #goodsGroupDataGateway = inject(GoodsGroupGateway);
  execute(params: string): Observable<string> {
    return this.#goodsGroupDataGateway.generateGoodsGroupCode(params)
  }
}
