import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsDeliveryItemModel } from '../model/goods-delivery-item.model';
import { GoodsDeliveryItemGateway } from '../gateway/goods-delivery-item.gateway';


export class UpdateDeliveryItemsInformaticsSerialNumberListUseCase implements UseCase<GoodsDeliveryItemModel[], GoodsDeliveryItemModel[]> {
  readonly #goodsDeliveryItemGateway = inject(GoodsDeliveryItemGateway);

  execute(params: GoodsDeliveryItemModel[]): Observable<GoodsDeliveryItemModel[]> {
    return this.#goodsDeliveryItemGateway.updateDeliveryItemInformaticsSerialList(params);
  }
}
