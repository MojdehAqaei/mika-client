import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { FiscalYearModel } from '../model/fiscal-year.model';
import { FiscalYearGateway } from '../gateway/fiscal-year.gateway';

export class UpdateFiscalYearUseCase implements UseCase<FiscalYearModel, FiscalYearModel>{
  readonly #fiscalYearGateway = inject(FiscalYearGateway);

  execute(params: FiscalYearModel): Observable<FiscalYearModel> {
    return this.#fiscalYearGateway.update(params);
  }
}
