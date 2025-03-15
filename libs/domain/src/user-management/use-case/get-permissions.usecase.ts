import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { RolePermissionModel } from '../model/role.model';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { PermissionGateway } from '../gateway/permission.gateway';
import { inject } from '@angular/core';


export class GetPermissionsUseCase implements UseCase<RolePermissionModel, ClTreeNode<RolePermissionModel>> {
  readonly #permissionGateway = inject(PermissionGateway);
  execute(): Observable<ClTreeNode<RolePermissionModel>[]> {
    return this.#permissionGateway.getPermissions();
  }
}
