import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PriceEstimateGateway } from '../gateway/price-estimate.gateway';
import { PriceEstimateModel } from '../model/price-estimate.model';


export class SavePriceEstimateUseCase implements UseCase<PriceEstimateModel, PriceEstimateModel> {
  readonly #priceEstimateGateway = inject(PriceEstimateGateway);
  readonly #appStore = inject(AppStore);



  execute(params: PriceEstimateModel): Observable<PriceEstimateModel> {
    params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    params.attachedFiles?.forEach((file) => {
      file.relatedEntity = 'PRICE_ESTIMATE';
    })
    return this.#priceEstimateGateway.create(params);
  }
}
