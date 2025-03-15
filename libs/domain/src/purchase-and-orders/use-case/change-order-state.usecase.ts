import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { OrderGateway } from '../gateway/order.gateway';

export class ChangeOrderStateUseCase implements UseCase<OrderModel, OrderModel> {
  readonly #orderGateway = inject(OrderGateway);

  execute(params: OrderModel): Observable<OrderModel> {
    return this.#orderGateway.updateOrderState(params)
  }
}
