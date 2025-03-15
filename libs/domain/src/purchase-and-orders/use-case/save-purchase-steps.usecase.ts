import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseStepsGateway } from '../gateway/purchase-steps.gateway';
import { PurchaseStepsModel } from '../model/purchase-steps.model';


export class SavePurchaseStepsUseCase implements UseCase<PurchaseStepsModel, PurchaseStepsModel> {
  readonly #purchaseStepsGateway = inject(PurchaseStepsGateway);
  readonly #appStore = inject(AppStore);
  execute(params: PurchaseStepsModel): Observable<PurchaseStepsModel> {
    params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#purchaseStepsGateway.create(params);
  }
}
