import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { StockroomGateway } from '../gateway/stockroom.gateway';
import { StockroomModel } from '../model/stockroom.model';

export class GetStockroomsUseCase implements UseCase<StockroomModel, StockroomModel[]> {
  readonly #stockroomGateway = inject(StockroomGateway);

  execute(filters: StockroomModel): Observable<StockroomModel[]> {
    return this.#stockroomGateway.filterAll(filters);
  }
}
