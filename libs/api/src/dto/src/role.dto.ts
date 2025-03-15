import { CategoryNames, PermissionNames } from '@domain/lib/user-management';
import { Pagination } from '@view/lib/models';
import { Crud } from '@view/lib/data-types';

export interface RolePermissionDto {
  object?: {
    id?: number;
    title?: string;
    status?: 1 | 2;
    name?: PermissionNames;
    categoryName?: CategoryNames;
  };
  behaviors?: {
    id?: number;
    title?: string;
    name?: Crud;
  }[];
}

export interface RoleDetailDto {
  id?: number;
  title?: string;
  status?: 1 | 2;
  createOnDate?: Date;
}

export interface RoleDto extends Pagination {
  role?: RoleDetailDto;
  permissions?: RolePermissionDto[];
}
