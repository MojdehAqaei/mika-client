import { RoleGateway } from '../../gateway/role.gateway';
import { PermissionGateway } from '../../gateway/permission.gateway';
import { GetRoleUseCase } from '../get-role.usecase';
import { GetRolesUseCase } from '../get-roles.usecase';
import { SaveRoleUseCse } from '../save-role.usecase';
import { UpdateRoleUseCase } from '../update-role.usecase';
import { DeleteRoleUseCase } from '../delete-role.usecase';
import { GetPermissionsUseCase } from '../get-permissions.usecase';
import { GetUserRolesByNationalNumberUseCase } from '../get-user-roles-by-national-number.usecase';


const getRoleUseCaseFactory = () => new GetRoleUseCase();
export const getRoleUseCaseProvider = {
  provide: GetRoleUseCase,
  useFactory: getRoleUseCaseFactory,
  deps: [RoleGateway]
};

const getUserRolesByNationalNumberUseCaseFactory = () => new GetUserRolesByNationalNumberUseCase();
export const getUserRolesByNationalNumberUseCaseProvider = {
  provide: GetUserRolesByNationalNumberUseCase,
  useFactory: getUserRolesByNationalNumberUseCaseFactory,
  deps: [RoleGateway]
};


const getAllRolesUseCaseFactory = () => new GetRolesUseCase();
export const getAllRolesUseCaseProvider = {
  provide: GetRolesUseCase,
  useFactory: getAllRolesUseCaseFactory,
  deps: [RoleGateway]
};


const saveRoleUseCaseFactory = () => new SaveRoleUseCse();
export const saveRoleUseCaseProvider = {
  provide: SaveRoleUseCse,
  useFactory: saveRoleUseCaseFactory,
  deps: [RoleGateway]
};

const updateRoleUseCaseFactory = () => new UpdateRoleUseCase();
export const updateRoleUseCaseProvider = {
  provide: UpdateRoleUseCase,
  useFactory: updateRoleUseCaseFactory,
  deps: [RoleGateway]
};

const deleteRoleUseCaseFactory = () => new DeleteRoleUseCase();
export const deleteRoleUseCaseProvider = {
  provide: DeleteRoleUseCase,
  useFactory: deleteRoleUseCaseFactory,
  deps: [RoleGateway]
};

const getAllPermissionsUseCaseFactory = () => new GetPermissionsUseCase();
export const getAllPermissionsUseCaseProvider = {
  provide: GetPermissionsUseCase,
  useFactory: getAllPermissionsUseCaseFactory,
  deps: [PermissionGateway]
};
