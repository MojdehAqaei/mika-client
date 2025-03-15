import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { InventoryTypeModel } from '../model/inventory-type.model';
import { InventoryTypeGateway } from '../gateway/inventory-type.gateway';

export class GetInventoryTypesUseCase implements UseCase<InventoryTypeModel, InventoryTypeModel> {
  readonly #inventoryTypeGateway = inject(InventoryTypeGateway);

  execute(filters: InventoryTypeModel): Observable<InventoryTypeModel[]> {
    return this.#inventoryTypeGateway.filterAll(filters);
  }
}
