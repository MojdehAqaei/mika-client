import { inject } from '@angular/core';
import { NEVER, Observable } from 'rxjs';

import { UseCase } from '../../use-case';
import { InventoryTypeModel } from '../model/inventory-type.model';
import { InventoryTypeGateway } from '../gateway/inventory-type.gateway';

export class SaveInventoryTypeUseCase implements UseCase<InventoryTypeModel, InventoryTypeModel>{
  readonly #inventoryTypeGateway = inject(InventoryTypeGateway);

  execute(params: InventoryTypeModel): Observable<InventoryTypeModel> {
    delete params.id;
    if (params.code?.length != 2) {
      return NEVER;
    }
    return this.#inventoryTypeGateway.create(params);
  }
}
