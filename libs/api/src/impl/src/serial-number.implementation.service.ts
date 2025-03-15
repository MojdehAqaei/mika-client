import { Injectable } from '@angular/core';
import { SerialNumberGateway } from '@domain/lib/purchase-and-orders';
import { map, Observable } from 'rxjs';
import { InformaticsSerialNumberDto } from '../../dto';
import { BaseService } from '../../misc';
import { SelectItem } from '@view/lib/models';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SerialNumberImplementationService extends BaseService<InformaticsSerialNumberDto> implements SerialNumberGateway {

  constructor() {
    super();
  }

  getAvailableDeliveryItemInformaticsSerialNumbers(goodsId: number, stockroomId: number, organizationId: number): Observable<SelectItem[]> {
    const params = new HttpParams()
      .set('goodsServiceId', goodsId)
      .set(organizationId ? 'organizationId' : 'inventoryId', organizationId ? organizationId : stockroomId);

    return this.get(`serialNumbers/find-all-available`, { params }).pipe(
      map(res => (res as InformaticsSerialNumberDto[])?.map(each => {
        return {
          value: each.id,
          name: each.serialNumber
        }
      }))
    );
  }

  getAllSelectableDeliveryItemInformaticsSerialNumbers(deliveryItemId: number, goodsId: number, stockroomId: number, organizationId: number): Observable<SelectItem[]> {
    const params = new HttpParams()
      .set('deliveryItemId', deliveryItemId)
      .set('goodsServiceId', goodsId)
      .set(organizationId ? 'organizationId' : 'inventoryId', organizationId ? organizationId : stockroomId);

    return this.get(`serialNumbers/find-all-selectable`, { params }).pipe(
      map(res => (res as InformaticsSerialNumberDto[])?.map(each => {
        return {
          value: each.id,
          name: each.serialNumber
        }
      }))
    );
  }

}
