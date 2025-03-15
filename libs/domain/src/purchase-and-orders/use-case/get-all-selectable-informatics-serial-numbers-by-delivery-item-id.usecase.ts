import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { SelectItem } from '@view/lib/models';
import { SerialNumberGateway } from '../gateway/serial-number.gateway';


export class GetAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase implements UseCase<
  { deliveryItemId?: number
    goodsId?: number
    stockroomId?: number
    organizationId?: number
  }, SelectItem[]> {
  readonly #serialNumberGateway = inject(SerialNumberGateway);

  execute(params: {deliveryItemId?: number, goodsId?: number, stockroomId?: number, organizationId?: number}): Observable<SelectItem[]> {
    return this.#serialNumberGateway.getAllSelectableDeliveryItemInformaticsSerialNumbers(
      params?.deliveryItemId,
      params?.goodsId,
      params?.stockroomId,
      params?.organizationId);
  }
}
