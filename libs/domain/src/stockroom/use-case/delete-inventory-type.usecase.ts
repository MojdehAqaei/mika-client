import { Observable } from 'rxjs';
import { inject } from '@angular/core';

import { UseCase } from '../../use-case';
import { InventoryTypeGateway } from '../gateway/inventory-type.gateway';

export class DeleteInventoryTypeUseCase implements UseCase<number, null> {
  readonly #inventoryTypeGateway = inject(InventoryTypeGateway);

  execute(id: number): Observable<null> {
    return this.#inventoryTypeGateway.deleteById(id);
  }
}
