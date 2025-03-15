import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { RoleModel } from '../model/role.model';
import { RoleGateway } from '../gateway/role.gateway';
import { inject } from '@angular/core';

export class SaveRoleUseCse implements UseCase<RoleModel, RoleModel> {
  readonly #roleGateway = inject(RoleGateway);
  execute(params: RoleModel): Observable<RoleModel> {
    return this.#roleGateway.create(params);
  }
}
