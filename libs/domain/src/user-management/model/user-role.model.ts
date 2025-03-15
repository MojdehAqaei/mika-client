import { UserContentAccessModel } from './user-content-access.model';
import { RolePermissionModel } from './role.model';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { Pagination } from '@view/lib/models';

export interface UserRoleModel extends Pagination {
  id?: number;
  userId?: number;
  userName?: string;
  userLName?: string;
  userNationalNumber?: string;
  isUSerActive?: boolean;
  roleId?: number;
  roleName?: string;
  organizationId?: number;
  organizationName?: string;
  organizationCode?: string;
  expiryDate?: Date;
  isActive?: boolean;
  permissions?: ClTreeNode<RolePermissionModel>[];
  contentAccessLevel?: UserContentAccessModel[];
}

export type UserRoleModelFilter = keyof UserRoleModel;
