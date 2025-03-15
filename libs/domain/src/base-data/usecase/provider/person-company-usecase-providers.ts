import { GetPersonCompanyListUseCase } from '../get-person-company-list.usecase';
import { PersonCompanyGateway } from '../../gateway/person-company.gateway';
import { GetPersonCompanyByIdUseCase } from '../get-person-company-by-id.usecase';
import { SavePersonCompanyUseCase } from '../save-person-company.usecase';
import { UpdatePersonCompanyUseCase } from '../update-person-company.usecase';
import { DeletePersonCompanyUseCase } from '../delete-person-company.usecase';
import { GetOwnershipTypesUseCase } from '../get-ownership-types.usecase';
import { GetContactInfoTypesUseCase } from '../get-contact-info-types.usecase';
import { GetAddressInfoTypesUseCase } from '../get-address-info-types.usecase';
import { GetBanksUseCase } from '../get-banks.usecase';

const getPersonCompanyListUseCaseFactory = () => new GetPersonCompanyListUseCase();
export const getPersonCompanyListUseCaseProvider = {
  provide: GetPersonCompanyListUseCase,
  useFactory: getPersonCompanyListUseCaseFactory,
  deps: [PersonCompanyGateway]
};


const getOwnershipTypesUseCaseFactory = () => new GetOwnershipTypesUseCase();
export const getOwnershipTypesUseCaseProvider = {
  provide: GetOwnershipTypesUseCase,
  useFactory: getOwnershipTypesUseCaseFactory,
  deps: [PersonCompanyGateway]
};


const getContactInfoTypesUseCaseFactory = () => new GetContactInfoTypesUseCase();
export const getContactInfoTypesUseCaseProvider = {
  provide: GetContactInfoTypesUseCase,
  useFactory: getContactInfoTypesUseCaseFactory,
  deps: [PersonCompanyGateway]
};


const getAddressInfoTypesUseCaseFactory = () => new GetAddressInfoTypesUseCase();
export const getAddressInfoTypesUseCaseProvider = {
  provide: GetAddressInfoTypesUseCase,
  useFactory: getAddressInfoTypesUseCaseFactory,
  deps: [PersonCompanyGateway]
};


const getBanksUseCaseFactory = () => new GetBanksUseCase();
export const getBanksUseCaseProvider = {
  provide: GetBanksUseCase,
  useFactory: getBanksUseCaseFactory,
  deps: [PersonCompanyGateway]
};


const getPersonCompanyByIdUseCaseFactory = () => new GetPersonCompanyByIdUseCase();
export const getPersonCompanyByIdUseCaseProvider = {
  provide: GetPersonCompanyByIdUseCase,
  useFactory: getPersonCompanyByIdUseCaseFactory,
  deps: [PersonCompanyGateway]
};




const savePersonCompanyUseCaseFactory = () => new SavePersonCompanyUseCase();
export const savePersonCompanyUseCaseProvider = {
  provide: SavePersonCompanyUseCase,
  useFactory: savePersonCompanyUseCaseFactory,
  deps: [PersonCompanyGateway]
};




const updatePersonCompanyUseCaseFactory = () => new UpdatePersonCompanyUseCase();
export const updatePersonCompanyUseCaseProvider = {
  provide: UpdatePersonCompanyUseCase,
  useFactory: updatePersonCompanyUseCaseFactory,
  deps: [PersonCompanyGateway]
};




const deletePersonCompanyUseCaseFactory = () => new DeletePersonCompanyUseCase();
export const deletePersonCompanyUseCaseProvider = {
  provide: DeletePersonCompanyUseCase,
  useFactory: deletePersonCompanyUseCaseFactory,
  deps: [PersonCompanyGateway]
};

