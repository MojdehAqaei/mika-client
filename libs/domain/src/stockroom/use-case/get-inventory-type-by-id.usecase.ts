import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { InventoryTypeModel } from '../model/inventory-type.model';
import { InventoryTypeGateway } from '../gateway/inventory-type.gateway';

export class GetInventoryTypeByIdUseCase implements UseCase<number, InventoryTypeModel> {
  readonly #inventoryTypeGateway = inject(InventoryTypeGateway);

  execute(id: number): Observable<InventoryTypeModel> {
    return this.#inventoryTypeGateway.read(id);
  }
}
