import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { RoleGateway } from '../gateway/role.gateway';
import { inject } from '@angular/core';

export class DeleteRoleUseCase implements UseCase<number, null> {
  readonly #roleGateway = inject(RoleGateway);
  execute(id: number): Observable<null> {
    return this.#roleGateway.deleteById(id);
  }
}
