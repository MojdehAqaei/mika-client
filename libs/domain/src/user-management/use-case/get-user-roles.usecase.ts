import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { UserRoleModel } from '../model/user-role.model';
import { UserRoleGateway } from '../gateway/user-role.gateway';


export class GetUserRolesUseCase implements UseCase<UserRoleModel, UserRoleModel[]> {
  readonly #userRoleGateway = inject(UserRoleGateway);
  execute(filters: UserRoleModel): Observable<UserRoleModel[]> {
    return this.#userRoleGateway.filterAll(filters);
  }
}
