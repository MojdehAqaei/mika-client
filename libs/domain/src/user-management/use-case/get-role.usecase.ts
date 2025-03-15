import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { RoleModel } from '../model/role.model';
import { RoleGateway } from '../gateway/role.gateway';
import { inject } from '@angular/core';


export class GetRoleUseCase implements UseCase<number, RoleModel> {
  readonly #roleGateway = inject(RoleGateway);
  execute(id: number): Observable<RoleModel> {
    return this.#roleGateway.read(id);
  }
}
