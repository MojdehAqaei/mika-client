import { UseCase } from '../../use-case';
import { NEVER, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsDeliveryItemModel } from '../model/goods-delivery-item.model';
import { GoodsDeliveryItemGateway } from '../gateway/goods-delivery-item.gateway';


export class UpdateDeliveryItemsListUseCase implements UseCase<GoodsDeliveryItemModel[], GoodsDeliveryItemModel[]> {
  readonly #goodsDeliveryItemGateway = inject(GoodsDeliveryItemGateway);

  execute(params: GoodsDeliveryItemModel[]): Observable<GoodsDeliveryItemModel[]> {
    // if (params.find(p => p.serialType == 'INFORMATICS_SERIES' && p.quantity != p.serialNumbers?.length)) {
    //   return NEVER;
    // }
    params.forEach(each =>  delete each.id);
    return this.#goodsDeliveryItemGateway.updateListByDeliveryId(params);
  }

}
