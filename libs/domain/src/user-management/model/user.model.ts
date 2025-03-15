import { RoleModel } from './role.model';
import { Pagination } from '@view/lib/models';

export interface UserPermission {
  type?: never;
  name?: string;
  parent?: string;
}

export interface UserModel extends Pagination {
  id?: number;
  name?: string;
  lName?: string;
  isActive?: boolean;
  nationalNumber?: string;
  employeeNumber?: string;
  organizationId?: number;
  organizationName?: string;
  organizationCode?: string;
  permissions?: UserPermission[];
  description?: string;
  currentRole?: RoleModel;
}


export type UserModelFilter = keyof UserModel;
