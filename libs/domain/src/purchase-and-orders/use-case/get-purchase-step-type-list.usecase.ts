import { inject } from '@angular/core';
import { SelectItem } from '@view/lib/models';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseStepsItemGateway } from '../gateway/purchase-steps-item.gateway';
import { PurchaseStepTypeModel } from '../model/purchase-step-type.model';
import { PurchaseStepsModel } from '../model/purchase-steps.model';

export class GetPurchaseStepTypeListUseCase implements UseCase<PurchaseStepTypeModel, SelectItem[]> {
  readonly #purchaseStepsItemGateway = inject(PurchaseStepsItemGateway);

  execute(params: PurchaseStepsModel): Observable<SelectItem[]> {
    return this.#purchaseStepsItemGateway.getPurchaseStepType(params);
  }
}
