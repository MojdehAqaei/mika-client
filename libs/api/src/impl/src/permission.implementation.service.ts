import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { PermissionGateway, RolePermissionModel } from '@domain/lib/user-management';
import { BaseService } from '../../misc';
import { PermissionMapper } from '../../mapper';
import { RolePermissionDto } from '../../dto';

@Injectable({
  providedIn: 'root'
})
export class PermissionImplementationService extends BaseService<RolePermissionDto> implements PermissionGateway {

  readonly #permissionMapper = new PermissionMapper();

  constructor() {
    super();
  }

  getPermissions(): Observable<ClTreeNode<RolePermissionModel>[]> {
    return this.getAll(`permissions/`).pipe(
      map(res => res.map(this.#permissionMapper.mapTo))
    );
  }

}
