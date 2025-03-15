import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { WarehousingModel } from '../model/warehousing.model';
import { WarehousingGateway } from '../gateway/warehousing.gateway';

export class UpdateWarehousingUseCase implements UseCase<WarehousingModel, WarehousingModel>{
  readonly #warehousingGateway = inject(WarehousingGateway);

  execute(params: WarehousingModel): Observable<WarehousingModel> {
    params.attachedFiles?.forEach((file) => {
      file.relatedEntity = 'INVENTORY_COUNT';
    });
    return this.#warehousingGateway.update(params);
  }
}
