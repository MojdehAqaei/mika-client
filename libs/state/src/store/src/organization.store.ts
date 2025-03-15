import { Store } from '../store';
import { organizationInitialState, OrganizationState } from '../../state';
import { Signal } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';


export class OrganizationStore {
  #store = new Store<OrganizationState>(organizationInitialState);
  public readonly state$: Signal<OrganizationState> = this.#store.state$.asReadonly();

  updateFilteredActiveOrganizations(organizations: ClSelectItem[]) {
    this.#store.updateField('filteredActiveOrganizations$', organizations)
  }
}
