import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseStepsItemGateway } from '../gateway/purchase-steps-item.gateway';
import { PurchaseStepsItemModel } from '../model/purchase-steps-item.model';


export class SavePurchaseStepsItemUseCase implements UseCase<PurchaseStepsItemModel, PurchaseStepsItemModel> {
  readonly #purchaseStepsItemGateway = inject(PurchaseStepsItemGateway);
  readonly #appStore = inject(AppStore);
  execute(params: PurchaseStepsItemModel): Observable<PurchaseStepsItemModel> {
    params.attachedFiles?.forEach((file) => {
      file.relatedEntity = 'PURCHASE_REFERENCE';
    })
    params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#purchaseStepsItemGateway.create(params);
  }
}
