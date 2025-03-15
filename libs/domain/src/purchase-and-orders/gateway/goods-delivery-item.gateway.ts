import { Observable } from 'rxjs';
import { GoodsDeliveryItemModel } from '../model/goods-delivery-item.model';

export abstract class GoodsDeliveryItemGateway {
  abstract updateListByDeliveryId(t: GoodsDeliveryItemModel[]): Observable<GoodsDeliveryItemModel[]>;
  abstract findByDeliveryId(id: number): Observable<GoodsDeliveryItemModel[]>;
  abstract updateDeliveryItemInformaticsSerialList(t: GoodsDeliveryItemModel[]): Observable<GoodsDeliveryItemModel[]>;
}
