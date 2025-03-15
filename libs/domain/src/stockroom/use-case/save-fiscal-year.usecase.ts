import { inject } from '@angular/core';
import { NEVER, Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { FiscalYearModel } from '../model/fiscal-year.model';
import { FiscalYearGateway } from '../gateway/fiscal-year.gateway';

export class SaveFiscalYearUseCase implements UseCase<FiscalYearModel, FiscalYearModel>{
  readonly #fiscalYearGateway = inject(FiscalYearGateway);

  execute(params: FiscalYearModel): Observable<FiscalYearModel> {
    delete params.id;
    if (params?.startDate && params?.endDate && params.startDate > params.endDate) {
      return NEVER;
    }
    return this.#fiscalYearGateway.create(params)
  }
}
