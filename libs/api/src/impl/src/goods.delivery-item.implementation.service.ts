import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../misc';
import { GoodsDeliveryItemDto } from '../../dto';
import { GoodsDeliveryItemGateway, GoodsDeliveryItemModel } from '@domain/lib/purchase-and-orders';
import { GoodsDeliveryItemMapper } from '../../mapper';

@Injectable({
  providedIn: 'root'
})
export class GoodsDeliveryItemImplementationService extends BaseService<GoodsDeliveryItemDto> implements GoodsDeliveryItemGateway {
  readonly #goodsDeliveryItemMapper = new GoodsDeliveryItemMapper();

  constructor() {
    super();
  }

  findByDeliveryId(id: number): Observable<GoodsDeliveryItemModel[]> {
    return this.getAll(`delivery-items/find-by-delivery/${id}`).pipe(
      map(res => res?.map(this.#goodsDeliveryItemMapper.mapTo))
    );
  }

  updateListByDeliveryId(body: GoodsDeliveryItemModel[]): Observable<GoodsDeliveryItemModel[]> {
    const tmp = body.map(this.#goodsDeliveryItemMapper.mapFrom);
    return this.put(`delivery-items/create-update-list/${tmp[0]?.delivery?.id}`, tmp, null, true).pipe(
      map(res => (res as GoodsDeliveryItemDto[])?.map(each => this.#goodsDeliveryItemMapper.mapTo(each)))
    );
  }

  updateDeliveryItemInformaticsSerialList(body: GoodsDeliveryItemModel[]): Observable<GoodsDeliveryItemModel[]> {
    const tmp = body.map(this.#goodsDeliveryItemMapper.mapFrom);
    return this.put(`delivery-items/add-change-informatics-serial-list/${tmp[0]?.delivery?.id}`, tmp, null, true).pipe(
      map(res => (res as GoodsDeliveryItemDto[]).map(each => this.#goodsDeliveryItemMapper.mapTo(each)))
    );
  }

}
