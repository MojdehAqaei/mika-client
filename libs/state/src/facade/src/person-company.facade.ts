import { inject, Injectable } from '@angular/core';
import { PersonCompanyStore } from '../../store';
import {
  GetPersonCompanyByIdUseCase,
  GetPersonCompanyListUseCase,
  SavePersonCompanyUseCase,
  UpdatePersonCompanyUseCase,
  GetOwnershipTypesUseCase,
  GetContactInfoTypesUseCase,
  DeletePersonCompanyUseCase,
  GetAddressInfoTypesUseCase,
  GetBanksUseCase,
  PersonCompanyModel,
  PersonCompanyModelFilter,
  personCompanyFilterDataMapper
} from '@domain/lib/base-data';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';
import { Crud } from "@view/lib/data-types";
import { ClSelectItem } from '@sadad/component-lib/src/models';


@Injectable()
export class PersonCompanyFacade {
  public personCompanyStore = inject(PersonCompanyStore);

  readonly #getPersonCompanyListUseCase = inject(GetPersonCompanyListUseCase);
  readonly #getPersonCompanyByIdUseCase = inject(GetPersonCompanyByIdUseCase);
  readonly #savePersonCompanyUseCase = inject(SavePersonCompanyUseCase);
  readonly #updatePersonCompanyUseCase = inject(UpdatePersonCompanyUseCase);
  readonly #deletePersonCompanyUseCase = inject(DeletePersonCompanyUseCase);
  readonly #getOwnershipTypesUseCase = inject(GetOwnershipTypesUseCase);
  readonly #getContactInfoTypesUseCase = inject(GetContactInfoTypesUseCase);
  readonly #getAddressInfoTypesUseCase = inject(GetAddressInfoTypesUseCase);
  readonly #getBanksUseCase = inject(GetBanksUseCase);

  constructor() {
    this.personCompanyStore.updatePageNumber(0);
    this.updatePersonCompanyList({});
  }


  /**
   * Get Ownership Types
   */
  @Cache()
  updateOwnershipTypeList() {
    this.#getOwnershipTypesUseCase.execute().subscribe((data: ClSelectItem[]) => {
      this.personCompanyStore.updateOwnershipTypes(data);
    });
  }


  /**
   * Get Contact Info Types
   */
  @Cache()
  updateContactInfoTypeList() {
    this.#getContactInfoTypesUseCase.execute().subscribe((data: ClSelectItem[]) => {
      this.personCompanyStore.updateContactInfoTypes(data);
    });
  }


  /**
   * Get Address Info Types
   */
  @Cache()
  updateAddressInfoTypeList() {
    this.#getAddressInfoTypesUseCase.execute().subscribe((data: ClSelectItem[]) => {
      this.personCompanyStore.updateAddressTypes(data);
    });
  }


  /**
   * Get Bank Types
   */
  @Cache()
  updateBankList() {
    this.#getBanksUseCase.execute().subscribe((data: ClSelectItem[]) => {
      this.personCompanyStore.updateBanks(data);
    });
  }

  /**
   * Get Person/Company Data
   */
  @Cache()
  updatePersonCompanyList(filters: PersonCompanyModel) {
    this.#getPersonCompanyListUseCase.execute(filters).subscribe((data: PersonCompanyModel[]) => {
      this.personCompanyStore.updatePersonCompanyList(data);
      data?.length && data[0].totalElements ? this.personCompanyStore.updateTotal(data[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as PersonCompanyModelFilter] != undefined && personCompanyFilterDataMapper.has(each as PersonCompanyModelFilter)) {
          tmp.push(personCompanyFilterDataMapper.get(each as PersonCompanyModelFilter)|| '');
        }
      })
      this.personCompanyStore.updateSearchFilterLabels(tmp);
    });
  }


  /**
   * Get Selected Person/Company By id
   * @param id
   */
  getSelectedPersonCompanyById(id: number) {
    this.personCompanyStore.updateDialogLoading(true);
    this.#getPersonCompanyByIdUseCase.execute(id).subscribe({
      next: (res) => {
        this.personCompanyStore.updateSelectedPersonCompany(res);
        this.personCompanyStore.updateDialogLoading(false);
      },
      error: () => {
        this.personCompanyStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Update Selected Person/Company
   * @param personCompany
   */
  updateSelectedPersonCompany(personCompany: PersonCompanyModel) {
    this.personCompanyStore.updateSelectedPersonCompany(personCompany);
  }

  /**
   * Toggle Edit Mode
   * @param editMode
   */
  toggleEditMode(editMode: boolean) {
    this.personCompanyStore.updateEditMode(editMode);
  }

  /**
   * Toggle Dialog visibility
   * @param visible
   */
  toggleDialogVisibility(visible: boolean) {
    this.personCompanyStore.updateDialogVisibility(visible);
  }

  /**
   * Update Page
   * @param pageSize
   * @param pageNumber
   */
  updatePage(pageSize: number, pageNumber: number) {
    this.personCompanyStore.updatePageSize(pageSize);
    this.personCompanyStore.updatePageNumber(pageNumber);
  }

  /**
   * Update AllowedActions
   * @param actions
   */
  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.personCompanyStore.updateAllowedActions(actions);
  }

  /**
   * Save Person/Company
   * @param personCompany
   */
  savePersonCompany(personCompany: PersonCompanyModel) {
    this.personCompanyStore.updateDialogLoading(true);
    this.#savePersonCompanyUseCase.execute(personCompany).subscribe({
      next: (res) => {

        // adding the new person/company to the list
        const total = this.personCompanyStore.state$().total$();
        const list = this.personCompanyStore.state$().personCompanyList$();
        list.push(res);
        this.personCompanyStore.updatePersonCompanyList([...list]);

        this.personCompanyStore.updateDialogLoading(false);
        this.personCompanyStore.updateDialogVisibility(false);
        this.personCompanyStore.updateTotal(total + 1);
      },
      error: () => {
        this.personCompanyStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Update Person/Company
   * @param personCompany
   */
  updatePersonCompany(personCompany: PersonCompanyModel) {
    this.personCompanyStore.updateDialogLoading(true);
    this.#updatePersonCompanyUseCase.execute(personCompany).subscribe({
      next: (res) => {

        // updating the selected person/company in the list
        const list = this.personCompanyStore.state$().personCompanyList$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.personCompanyStore.updatePersonCompanyList([...list]);

        this.personCompanyStore.updateDialogLoading(false);
        this.personCompanyStore.updateDialogVisibility(false);
      },
      error: () => {
        this.personCompanyStore.updateDialogLoading(false);
      }
    });
  }

  /**
   * Delete Person/Company
   * @param id
   */
  @ErrorLogger()
  deletePersonCompanyById(id: number) {
    this.#deletePersonCompanyUseCase.execute(id).subscribe(() => {
      // removing the deleted person/company from the list
      const total = this.personCompanyStore.state$().total$();
      const list = this.personCompanyStore.state$().personCompanyList$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.personCompanyStore.updatePersonCompanyList([...list]);
      this.personCompanyStore.updateTotal(total - 1);
    });
  }
}
