import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { OrderGateway } from '../gateway/order.gateway';


export class DeleteOrderUseCase implements UseCase<number, null> {
  readonly #orderGateway = inject(OrderGateway);
  execute(id: number): Observable<null> {
    return this.#orderGateway.deleteById(id);
  }
}
