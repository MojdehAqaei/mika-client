import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { UserRoleGateway } from '../gateway/user-role.gateway';
import { UserContentAccessModel } from '../model/user-content-access.model';


export class GetUserRoleContentPermissionsByIdUseCase implements UseCase<UserContentAccessModel, UserContentAccessModel> {
  readonly #userRoleGateway = inject(UserRoleGateway);
  execute(param: UserContentAccessModel): Observable<UserContentAccessModel> {
    return this.#userRoleGateway.getUserRoleContentPermissionsById(param);
  }
}
