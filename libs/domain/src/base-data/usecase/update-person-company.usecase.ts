import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PersonCompanyModel } from '../model/person-company.model';
import { PersonCompanyGateway } from '../gateway/person-company.gateway';
import { PersonTypeEnum } from '../enum/person-type.enum';

export class UpdatePersonCompanyUseCase implements UseCase<PersonCompanyModel, PersonCompanyModel> {
  readonly #personCompanyGateway = inject(PersonCompanyGateway);

  execute(params: PersonCompanyModel): Observable<PersonCompanyModel> {

/*    if (!params.contactInfo?.list?.length ||
      !params.address?.list?.length ||
      !params.bankAccountInfo?.list?.length
    ) {
      return NEVER;
    }*/

    /** if there is one contact item, it should be set as default */
    if (params.contactInfo?.list?.length) {
      if (params.contactInfo?.list?.length == 1) {
        params.contactInfo.list[0].isDefault = true;
      } else if (!params.contactInfo?.list.some(i => i.isDefault)) {
        params.contactInfo.list[0].isDefault = true;
      }
    }


    /** if there is one bank account item, it should be set as default */
    if (params.bankAccountInfo?.list?.length) {
      if (params.bankAccountInfo?.list?.length == 1) {
        params.bankAccountInfo.list[0].isDefault = true;
      } else if (!params.bankAccountInfo?.list.some(i => i.isDefault)) {
        params.bankAccountInfo.list[0].isDefault = true;
      }
    }

    /** if there is one address item, it should be set as default */
    if (params.address?.list?.length) {
      if (params.address?.list?.length == 1) {
        params.address.list[0].isDefault = true;
      } else if (!params.address?.list.some(i => i.isDefault)) {
        params.address.list[0].isDefault = true;
      }
    }


    if (params.type == PersonTypeEnum.NATURAL_PERSON) {
      delete params.ownershipTypeId;
      delete params.ceoName;
      delete params.ceoNationalNumber;
    }

    return this.#personCompanyGateway.update(params);
  }
}
