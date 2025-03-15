import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { RoleGateway } from '../gateway/role.gateway';
import { RoleModel } from '../model/role.model';
import { inject } from '@angular/core';

export class UpdateRoleUseCase implements UseCase<RoleModel, RoleModel> {
  readonly #roleGateway = inject(RoleGateway);
  execute(params: RoleModel): Observable<RoleModel> {
    return this.#roleGateway.update(params);
  }
}
