import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { StockroomGateway } from '../gateway/stockroom.gateway';
import { StockroomModel } from '../model/stockroom.model';

export class SaveStockroomUseCase implements UseCase<StockroomModel, StockroomModel>{
  readonly #stockroomGateway = inject(StockroomGateway);

  execute(params: StockroomModel): Observable<StockroomModel> {
    delete params.id;
    return this.#stockroomGateway.create(params);
  }
}
