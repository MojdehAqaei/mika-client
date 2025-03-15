import { NEVER, Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { InventoryTypeModel } from '../model/inventory-type.model';
import { InventoryTypeGateway } from '../gateway/inventory-type.gateway';

export class UpdateInventoryTypeUseCase implements UseCase<InventoryTypeModel, InventoryTypeModel> {
  readonly #inventoryTypeGateway = inject(InventoryTypeGateway);

  execute(params: InventoryTypeModel): Observable<InventoryTypeModel> {
    if (params.code?.length != 2) {
      return NEVER;
    }
    return this.#inventoryTypeGateway.update(params);
  }
}
