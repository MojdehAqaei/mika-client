import { GetOrganizationsUseCase } from '../get-organizations.usecase';
import { OrganizationGateway } from '../../gateway/organization.gateway';
import { GetActiveOrganizationsUseCase } from '../get-active-organizations.usecase';


const getOrganizationsUseCaseFactory = () => new GetOrganizationsUseCase();
export const getOrganizationsUseCaseProvider = {
  provide: GetOrganizationsUseCase,
  useFactory: getOrganizationsUseCaseFactory,
  deps: [OrganizationGateway]
};



const getActiveOrganizationsUseCaseFactory = () => new GetActiveOrganizationsUseCase();
export const getActiveOrganizationsUseCaseProvider = {
  provide: GetActiveOrganizationsUseCase,
  useFactory: getActiveOrganizationsUseCaseFactory,
  deps: [OrganizationGateway]
};
