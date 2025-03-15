import { Observable } from "rxjs";
import { SelectItem } from '@view/lib/models';

export abstract class SerialNumberGateway {
  abstract getAvailableDeliveryItemInformaticsSerialNumbers(goodsId?: number, stockroomId?: number, organizationId?: number): Observable<SelectItem[]>;
  abstract getAllSelectableDeliveryItemInformaticsSerialNumbers(deliveryItemId?: number, goodsId?: number, stockroomId?: number, organizationId?: number): Observable<SelectItem[]>;
}
