import { UserDto } from './user.dto';
import { RoleDetailDto, RolePermissionDto } from './role.dto';
import { UserContentAccessDto } from './user-content-access.dto';
import { Pagination } from '@view/lib/models';

export interface UserRoleDto extends Pagination {
  id?: number;
  user?: UserDto;
  role?: RoleDetailDto;
  accessExpireDate?: Date;
  status?: 1 | 2;
  permissions?: RolePermissionDto[];
  contentPermissions?: UserContentAccessDto[];
}
