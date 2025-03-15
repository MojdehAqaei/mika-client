import { Observable } from 'rxjs';
import { PersonCompanyModel } from '../model/person-company.model';
import { ClSelectItem } from '@sadad/component-lib/src/models';
import { Gateway } from '../../gateway';

export abstract class PersonCompanyGateway extends Gateway<PersonCompanyModel>{
  abstract getOwnershipTypes(): Observable<ClSelectItem[]>;
  abstract getContactInfoTypes(): Observable<ClSelectItem[]>;
  abstract getAddressInfoTypes(): Observable<ClSelectItem[]>;
  abstract getBanks(): Observable<ClSelectItem[]>;
}
