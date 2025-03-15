import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { RoleModel } from '../model/role.model';
import { RoleGateway } from '../gateway/role.gateway';


export class GetUserRolesByNationalNumberUseCase implements UseCase<string, RoleModel[]> {
  readonly #roleGateway = inject(RoleGateway);
  execute(nationalNumber?: string): Observable<RoleModel[]> {
    return this.#roleGateway.getUserRolesByNationalNumber(nationalNumber);
  }
}
