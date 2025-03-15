import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { UserGateway } from '../gateway/user.gateway';
import { inject } from '@angular/core';

export class DeleteUserUseCase implements UseCase<number, null> {
  readonly #userGateway = inject(UserGateway);
  execute(id: number): Observable<null> {
    return this.#userGateway.deleteById(id);
  }
}
