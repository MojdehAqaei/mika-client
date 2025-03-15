import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { FiscalYearPerStockroomModel } from '../model/fiscal-year-per-stockroom.model';
import { FiscalYearPerStockroomGateway } from '../gateway/fiscal-year-per-stockroom.gateway';

export class UpdateFiscalYearPerStockroomUseCase implements UseCase<FiscalYearPerStockroomModel, FiscalYearPerStockroomModel>{
  readonly #fiscalYearPerStockroomGateway = inject(FiscalYearPerStockroomGateway);

  execute(params: FiscalYearPerStockroomModel): Observable<FiscalYearPerStockroomModel> {
    return this.#fiscalYearPerStockroomGateway.update(params);
  }
}
