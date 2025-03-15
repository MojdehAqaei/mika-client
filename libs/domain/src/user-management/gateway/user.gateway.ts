import { Observable } from 'rxjs';
import { UserModel } from '../model/user.model';
import { Gateway } from '../../gateway';
import { UserRoleModel } from '../model/user-role.model';


export abstract class UserGateway extends Gateway<UserModel>{
  abstract changeUserSelectedRole(roleId: number): Observable<UserRoleModel>;
  abstract refreshToken(): Observable<null>;
  abstract logout(): Observable<null>;
}
