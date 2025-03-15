import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { UserGateway } from '../gateway/user.gateway';
import { inject } from '@angular/core';

export class UserLogoutUseCase implements UseCase<null, null> {
  readonly #userGateway = inject(UserGateway);
  execute(): Observable<null> {
    return this.#userGateway.logout();
  }
}
