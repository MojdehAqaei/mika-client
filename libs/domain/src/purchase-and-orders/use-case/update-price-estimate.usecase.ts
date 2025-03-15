import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PriceEstimateGateway } from '../gateway/price-estimate.gateway';
import { PriceEstimateModel } from '../model/price-estimate.model';


export class UpdatePriceEstimateUseCase implements UseCase<PriceEstimateModel, PriceEstimateModel> {
    readonly #priceEstimateGateway = inject(PriceEstimateGateway);
    readonly #appStore = inject(AppStore);

    execute(params: PriceEstimateModel): Observable<PriceEstimateModel> {
        params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
        return this.#priceEstimateGateway.update(params);
    }
}
