import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { OrderGateway } from '../gateway/order.gateway';
import { OrderModel } from '../model/order.model';


export class UpdateOrderUseCase implements UseCase<OrderModel, OrderModel> {
    readonly #orderGateway = inject(OrderGateway);
    readonly #appStore = inject(AppStore);

    execute(params: OrderModel): Observable<OrderModel> {
        params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
        params.orderingOrganizationId = this.#appStore.state$().loggedInUser$()?.organizationId;
        params.attachedFiles?.forEach((file) => {
            file.relatedEntity = 'ORDER';
        })
        return this.#orderGateway.update(params);
    }
}
