import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { OrderGateway } from '../gateway/order.gateway';
import { OrderModel } from '../model/order.model';


export class SaveOrderUseCase implements UseCase<OrderModel, OrderModel> {
    readonly #orderGateway = inject(OrderGateway);
    readonly #appStore = inject(AppStore);

    execute(params: OrderModel): Observable<OrderModel> {
        delete params.id;
        params.orderingOrganizationId = this.#appStore.state$().loggedInUser$()?.organizationId;
        params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
        params.attachedFiles?.forEach((file) => {
            file.relatedEntity = 'ORDER';
        })
        return this.#orderGateway.create(params);
    }
}
