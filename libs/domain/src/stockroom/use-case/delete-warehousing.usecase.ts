import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { WarehousingGateway } from '../gateway/warehousing.gateway';

export class DeleteWarehousingUseCase implements UseCase<number, null>{
  readonly #warehousingGateway = inject(WarehousingGateway);

  execute(id: number): Observable<null> {
    return this.#warehousingGateway.deleteById(id)
  }
}
