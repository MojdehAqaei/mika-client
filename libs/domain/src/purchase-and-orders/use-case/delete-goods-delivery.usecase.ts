import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsDeliveryGateway } from '../gateway/goods-delivery.gateway';


export class DeleteGoodsDeliveryUseCase implements UseCase<number, null> {
  readonly #goodsDeliveryGateway = inject(GoodsDeliveryGateway);
  execute(id: number): Observable<null> {
    return this.#goodsDeliveryGateway.deleteById(id);
  }
}
