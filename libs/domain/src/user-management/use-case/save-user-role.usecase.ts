import { Observable } from "rxjs";
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { UserRoleModel } from '../model/user-role.model';
import { UserRoleGateway } from '../gateway/user-role.gateway';

export class SaveUserRoleUseCase implements UseCase<UserRoleModel, UserRoleModel> {
  readonly #userRoleGateway = inject(UserRoleGateway);
  execute(params: UserRoleModel): Observable<UserRoleModel> {
    delete params.id;
    delete params.contentAccessLevel;
    return this.#userRoleGateway.create(params);
  }
}
