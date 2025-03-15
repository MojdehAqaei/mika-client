import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { OrganizationGateway } from '../gateway/organization.gateway';
import { OrganizationModel } from '../model/organization.model';
import { OrganizationTypeEnum } from '../enum/organization-type.enum';
import { ClSelectItem } from '@sadad/component-lib/src/models';


export class GetActiveOrganizationsUseCase implements UseCase<any, ClSelectItem[]> {
  readonly #organizationGateway = inject(OrganizationGateway);

  execute(filter: string, orgTypes?: OrganizationTypeEnum[]): Observable<ClSelectItem[]> {
    return this.#organizationGateway.getActiveOrganizations(filter, orgTypes);
  }
}
