import { Observable } from 'rxjs';
import { RoleModel } from '../model/role.model';
import { Gateway } from '../../gateway';


export abstract class RoleGateway extends Gateway<RoleModel>{
  abstract getUserRolesByNationalNumber(nationalNumber?: string): Observable<RoleModel[]>
}
