import { Observable } from 'rxjs';
import { OrganizationModel } from '../model/organization.model';
import { OrganizationTypeEnum } from '../enum/organization-type.enum';
import { ClSelectItem } from '@sadad/component-lib/src/models';



export abstract class OrganizationGateway {
  abstract getOrganizations(filter: string): Observable<OrganizationModel[]>;
  abstract getActiveOrganizations(filter: string, orgTypes?: OrganizationTypeEnum[]): Observable<ClSelectItem[]>;
}
