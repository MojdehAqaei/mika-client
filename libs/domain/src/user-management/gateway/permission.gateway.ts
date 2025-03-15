import { Observable } from 'rxjs';
import { RolePermissionModel } from '../model/role.model';
import { ClTreeNode } from '@sadad/component-lib/src/models';


export abstract class PermissionGateway {
  abstract getPermissions(): Observable<ClTreeNode<RolePermissionModel>[]>;
}
