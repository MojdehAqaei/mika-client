import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { StockroomGateway } from '../gateway/stockroom.gateway';
import { StockroomModel } from '../model/stockroom.model';

export class FilterStockroomsByFiscalPeriodIdUseCase implements UseCase<{fiscalPeriodId: number, filter: string}, StockroomModel[]> {
  readonly #stockroomGateway = inject(StockroomGateway);

  execute(param: {fiscalPeriodId: number, filter: string}): Observable<StockroomModel[]> {
    return this.#stockroomGateway.filterByFiscalPeriod(param);
  }
}
