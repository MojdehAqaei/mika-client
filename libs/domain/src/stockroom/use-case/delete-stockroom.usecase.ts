import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { StockroomGateway } from '../gateway/stockroom.gateway';

export class DeleteStockroomUseCase implements UseCase<number, null>{
  readonly #stockroomGateway = inject(StockroomGateway);

  execute(id: number): Observable<null> {
    return this.#stockroomGateway.deleteById(id)
  }
}
