import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { OrderModel } from '../model/order.model';
import { OrderGateway } from '../gateway/order.gateway';


export class GetOrderListUseCase implements UseCase<OrderModel, OrderModel[]> {
  readonly #orderGateway = inject(OrderGateway);
  readonly #appStore = inject(AppStore);

  execute(filters: OrderModel): Observable<OrderModel[]> {
    filters.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#orderGateway.filterAll(filters);
  }
}
