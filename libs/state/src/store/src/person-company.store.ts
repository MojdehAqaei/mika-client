import { Store } from '../store';
import { personCompanyInitialState, PersonCompanyState } from '../../state';
import { signal, Signal } from '@angular/core';
import { PersonCompanyModel } from '@domain/lib/base-data';
import { Crud } from "@view/lib/data-types";
import { ClSelectItem } from '@sadad/component-lib/src/models';

export class PersonCompanyStore {
  #store = new Store<PersonCompanyState>(personCompanyInitialState);
  public readonly state$: Signal<PersonCompanyState> = this.#store.state$.asReadonly();

  updatePersonCompanyList(list: PersonCompanyModel[]) {
    this.#store.updateField('personCompanyList$', list);
  }

  updateSelectedPersonCompany(personCompany: PersonCompanyModel) {
    this.#store.updateField('selectedPersonCompany$', personCompany);
  }

  updateOwnershipTypes(ownershipTypes: ClSelectItem[]) {
    this.#store.updateField('ownershipTypes$', ownershipTypes);
  }

  updateContactInfoTypes(contactTypes: ClSelectItem[]) {
    this.#store.updateField('contactInfoTypes$', contactTypes);
  }

  updateAddressTypes(addressTypes: ClSelectItem[]) {
    this.#store.updateField('addressInfoTypes$', addressTypes);
  }

  updateBanks(banks: ClSelectItem[]) {
    this.#store.updateField('banks$', banks);
  }

  updateDialogLoading(lazyLoading: boolean) {
    this.#store.updateField('dialogLoading$', lazyLoading);
  }

  updateDialogVisibility(visible: boolean) {
    this.#store.updateField('dialogVisible$', visible);
  }

  updateEditMode(editMode: boolean) {
    this.#store.updateField('editMode$', editMode);
  }

  updatePageSize(size: number) {
    this.#store.updateField('pageSize$', size);
  }

  updatePageNumber(number: number) {
    this.#store.updateField('pageNumber$', number);
  }

  updateTotal(total: number) {
    this.#store.updateField('total$', total);;
  }

  updateSearchFilterLabels(labels: string[]) {
    this.#store.updateField('searchFilterLabels$', labels);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.#store.updateField('allowedActions$', actions);
  }
}
