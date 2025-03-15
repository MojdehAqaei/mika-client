import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { OrganizationGateway } from '../gateway/organization.gateway';
import { OrganizationModel } from '../model/organization.model';


export class GetOrganizationsUseCase implements UseCase<string, OrganizationModel[]> {
  readonly #organizationGateway = inject(OrganizationGateway);
  execute(filter: string): Observable<OrganizationModel[]> {
    return this.#organizationGateway.getOrganizations(filter);
  }
}
