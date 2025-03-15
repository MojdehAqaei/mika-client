import { inject, Injectable } from '@angular/core';
import { OrganizationStore } from '../../store';
import { GetActiveOrganizationsUseCase, OrganizationModel, OrganizationTypeEnum } from '@domain/lib/organization';
import { ClSelectItem } from '@sadad/component-lib/src/models';


@Injectable()
export class OrganizationFacade {
  public organizationStore = inject(OrganizationStore);

  readonly #getActiveOrganizationsUseCase = inject(GetActiveOrganizationsUseCase);

  /**
   * Get Active Organizations
   * @param filter
   * @param orgTypes
   */
  updateActiveOrganizationsByFilter(filter: string, orgTypes?: OrganizationTypeEnum[]) {
    this.#getActiveOrganizationsUseCase.execute(filter, orgTypes).subscribe((data: ClSelectItem[]) => {
      this.organizationStore.updateFilteredActiveOrganizations(data);
    });
  }
}
