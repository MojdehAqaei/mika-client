import { Observable } from 'rxjs';
import { UserRoleModel } from '../model/user-role.model';
import { UserContentAccessModel } from '../model/user-content-access.model';
import { Gateway } from '../../gateway';


export abstract class UserRoleGateway extends Gateway<UserRoleModel>{
  abstract saveUserRoleContentPermissions(body: UserContentAccessModel): Observable<UserContentAccessModel>
  abstract getUserRoleContentPermissionsById(body: UserContentAccessModel): Observable<UserContentAccessModel>
}
