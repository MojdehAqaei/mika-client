import { inject } from '@angular/core';
import { NEVER, Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { FiscalYearPerStockroomModel } from '../model/fiscal-year-per-stockroom.model';
import { FiscalYearPerStockroomGateway } from '../gateway/fiscal-year-per-stockroom.gateway';

export class SaveFiscalYearPerStockroomUseCase implements UseCase<FiscalYearPerStockroomModel, FiscalYearPerStockroomModel>{
  readonly #fiscalYearPerStockroomGateway = inject(FiscalYearPerStockroomGateway);

  execute(params: FiscalYearPerStockroomModel): Observable<FiscalYearPerStockroomModel> {
    delete params.id;
    params.date = new Date();
    return this.#fiscalYearPerStockroomGateway.create(params)
  }
}
