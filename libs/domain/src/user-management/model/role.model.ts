import { ClTreeNode } from '@sadad/component-lib/src/models';
import { CategoryNames } from '../enum/category-name.enum';
import { PermissionNames } from '../enum/permission-name.enum';
import { Pagination } from '@view/lib/models';
import { Crud } from '@view/lib/data-types';


export interface RolePermissionModel {
  id?: number;
  name?: PermissionNames | any;
  value?: (Crud | undefined)[];
  // children?: RolePermissionModel[];
  upperMenuName?: CategoryNames;
}

export interface RoleModel extends Pagination {
  id?: number;
  label?: string;
  isActive?: boolean;
  value?: any;
  createDate?: any;
  permissions?: ClTreeNode<RolePermissionModel>[];
}

export type RoleModelFilter = keyof RoleModel;
