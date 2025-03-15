import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsDeliveryItemModel } from '../model/goods-delivery-item.model';
import { GoodsDeliveryItemGateway } from '../gateway/goods-delivery-item.gateway';


export class GetDeliveryItemsByDeliveryIdUseCase implements UseCase<number, GoodsDeliveryItemModel[]> {
  readonly #goodsDeliveryItemGateway = inject(GoodsDeliveryItemGateway);

  execute(id: number): Observable<GoodsDeliveryItemModel[]> {
    return this.#goodsDeliveryItemGateway.findByDeliveryId(id);
  }
}
