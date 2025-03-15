import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { StockroomModel } from '../model/stockroom.model';
import { StockroomGateway } from '../gateway/stockroom.gateway';

export class UpdateStockroomUseCase implements UseCase<StockroomModel, StockroomModel>{
  readonly #stockroomGateway = inject(StockroomGateway);

  execute(params: StockroomModel): Observable<StockroomModel> {
    return this.#stockroomGateway.update(params);
  }
}
