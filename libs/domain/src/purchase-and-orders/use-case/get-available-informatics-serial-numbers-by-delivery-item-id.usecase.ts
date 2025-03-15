import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { SelectItem } from '@view/lib/models';
import { SerialNumberGateway } from '../gateway/serial-number.gateway';


export class GetAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase implements UseCase<
  { goodsId?: number
    stockroomId?: number
    organizationId?: number
  }, SelectItem[]> {
  readonly #serialNumberGateway = inject(SerialNumberGateway);

  execute(params: {goodsId?: number, stockroomId?: number, organizationId?: number}): Observable<SelectItem[]> {
    return this.#serialNumberGateway.getAvailableDeliveryItemInformaticsSerialNumbers(
      params?.goodsId,
      params?.stockroomId,
      params?.organizationId);
  }
}
