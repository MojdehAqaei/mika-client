import { RoleDetailDto } from './role.dto';
import { Pagination } from '@view/lib/models';

export interface UserDto extends Pagination {
  id?: number;
  firstName?: string;
  lastName?: string;
  status?: 1 | 2;
  ssoId?: string;
  organization?: { id?: number; name?: string; code?: string };
  nationalCode?: string;
  personnelCode?: string;
  permissions?: any[];
  description?: string;
  loginRole?: RoleDetailDto;
  loginUserRoleId?: number;
}
