import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { FiscalYearPerStockroomGateway } from '../gateway/fiscal-year-per-stockroom.gateway';

export class DeleteFiscalYearPerStockroomUseCase implements UseCase<number, null>{
  readonly #fiscalYearPerStockroomGateway = inject(FiscalYearPerStockroomGateway);

  execute(id: number): Observable<null> {
    return this.#fiscalYearPerStockroomGateway.deleteById(id)
  }
}
