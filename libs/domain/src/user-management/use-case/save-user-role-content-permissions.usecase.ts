import { NEVER, Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { UserRoleGateway } from '../gateway/user-role.gateway';
import { UserContentAccessModel } from '../model/user-content-access.model';


export class SaveUserRoleContentPermissionsUseCase implements UseCase<UserContentAccessModel, UserContentAccessModel> {
  readonly #userRoleGateway = inject(UserRoleGateway);
  execute(param: UserContentAccessModel): Observable<UserContentAccessModel> {
    if ((param.selectionMode == 'some' && !param.idList?.length) ||
        (param.selectionMode == 'all' && param.idList?.length) ||
        (param.selectionMode == 'none')
    ) {
      return NEVER;
    }
    return this.#userRoleGateway.saveUserRoleContentPermissions(param);
  }
}
