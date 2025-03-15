import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { FiscalYearGateway } from '../gateway/fiscal-year.gateway';

export class DeleteFiscalYearUseCase implements UseCase<number, null>{
  readonly #fiscalYearGateway = inject(FiscalYearGateway);

  execute(id: number): Observable<null> {
    return this.#fiscalYearGateway.deleteById(id)
  }
}
