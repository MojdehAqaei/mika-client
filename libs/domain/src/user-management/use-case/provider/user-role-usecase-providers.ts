import { GetUserRolesUseCase } from '../get-user-roles.usecase';
import { UserRoleGateway } from '../../gateway/user-role.gateway';
import { SaveUserRoleUseCase } from '../save-user-role.usecase';
import { UpdateUserRoleUseCase } from '../update-user-role.usecase';
import { DeleteUserRoleUseCase } from '../delete-user-role.usecase';
import { SaveUserRoleContentPermissionsUseCase } from '../save-user-role-content-permissions.usecase';
import { GetUserRoleContentPermissionsByIdUseCase } from '../get-user-role-content-permissions-by-id.usecase';


const getUserRolesUseCaseFactory = () => new GetUserRolesUseCase();
export const getUserRolesUseCaseProvider = {
  provide: GetUserRolesUseCase,
  useFactory: getUserRolesUseCaseFactory,
  deps: [UserRoleGateway]
};

const saveUserRoleUseCaseFactory = () => new SaveUserRoleUseCase();
export const saveUserRoleUseCaseProvider = {
  provide: SaveUserRoleUseCase,
  useFactory: saveUserRoleUseCaseFactory,
  deps: [UserRoleGateway]
};


const updateUserRoleUseCaseFactory = () => new UpdateUserRoleUseCase();
export const updateUserRoleUseCaseProvider = {
  provide: UpdateUserRoleUseCase,
  useFactory: updateUserRoleUseCaseFactory,
  deps: [UserRoleGateway]
};


const deleteUserRoleUseCaseFactory = () => new DeleteUserRoleUseCase();
export const deleteUserRoleUseCaseProvider = {
  provide: DeleteUserRoleUseCase,
  useFactory: deleteUserRoleUseCaseFactory,
  deps: [UserRoleGateway]
};



const saveUserRoleContentPermissionsUseCaseFactory = () => new SaveUserRoleContentPermissionsUseCase();
export const saveUserRoleContentPermissionsUseCaseProvider = {
  provide: SaveUserRoleContentPermissionsUseCase,
  useFactory: saveUserRoleContentPermissionsUseCaseFactory,
  deps: [UserRoleGateway]
};




const getUserRoleContentPermissionsByIdUseCaseFactory = () => new GetUserRoleContentPermissionsByIdUseCase();
export const getUserRoleContentPermissionsByIdUseCaseProvider = {
  provide: GetUserRoleContentPermissionsByIdUseCase,
  useFactory: getUserRoleContentPermissionsByIdUseCaseFactory,
  deps: [UserRoleGateway]
};

