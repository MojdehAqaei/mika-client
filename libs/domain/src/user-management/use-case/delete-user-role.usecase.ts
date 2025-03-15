import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { UserRoleGateway } from '../gateway/user-role.gateway';

export class DeleteUserRoleUseCase implements UseCase<number, null> {
  readonly #userRoleGateway = inject(UserRoleGateway);
  execute(id: number): Observable<null> {
    return this.#userRoleGateway.deleteById(id);
  }
}
