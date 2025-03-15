import { UserGateway } from '../../gateway/user.gateway';
import { GetUserUseCase } from '../get-user.usecase';
import { UserLogoutUseCase } from '../user-logout.usecase';
import { GetUsersUseCase } from '../get-users.usecase';
import { SaveUserUseCse } from '../save-user.usecase';
import { DeleteUserUseCase } from '../delete-user.usecase';
import { UpdateUserUseCase } from '../update-user.usecase';
import { UpdateLoggedInUserRoleUseCase } from '../update-logged-in-user-role.usecase';


const getUserUseCaseFactory = () => new GetUserUseCase();
export const getUserUseCaseProvider = {
  provide: GetUserUseCase,
  useFactory: getUserUseCaseFactory,
  deps: [UserGateway]
};

const userLogoutUseCaseFactory = () => new UserLogoutUseCase();
export const userLogoutUseCaseProvider = {
  provide: UserLogoutUseCase,
  useFactory: userLogoutUseCaseFactory,
  deps: [UserGateway]
};

const updateLoggedInUserRoleUseCaseFactory = () => new UpdateLoggedInUserRoleUseCase();
export const updateLoggedInUserRoleUseCaseProvider = {
  provide: UpdateLoggedInUserRoleUseCase,
  useFactory: updateLoggedInUserRoleUseCaseFactory,
  deps: [UserGateway]
};


const getAllUsersUseCaseFactory = () => new GetUsersUseCase();
export const getAllUsersUseCaseProvider = {
  provide: GetUsersUseCase,
  useFactory: getAllUsersUseCaseFactory,
  deps: [UserGateway]
};


const saveUserUseCaseFactory = () => new SaveUserUseCse();
export const saveUserUseCaseProvider = {
  provide: SaveUserUseCse,
  useFactory: saveUserUseCaseFactory,
  deps: [UserGateway]
};


const deleteUserUseCaseFactory = () => new DeleteUserUseCase();
export const deleteUserUseCaseProvider = {
  provide: DeleteUserUseCase,
  useFactory: deleteUserUseCaseFactory,
  deps: [UserGateway]
};



const updateUserUseCaseFactory = () => new UpdateUserUseCase();
export const updateUserUseCaseProvider = {
  provide: UpdateUserUseCase,
  useFactory: updateUserUseCaseFactory,
  deps: [UserGateway]
};
