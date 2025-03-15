import { GetInventoryTypesUseCase } from '../get-inventory-types.usecase';
import { InventoryTypeGateway } from '../../gateway/inventory-type.gateway';
import { UpdateInventoryTypeUseCase } from '../update-inventory-types.usecase';
import { SaveInventoryTypeUseCase } from '../save-inventory-type.usecase';
import { DeleteInventoryTypeUseCase } from '../delete-inventory-type.usecase';
import { GetInventoryTypeByIdUseCase } from '../get-inventory-type-by-id.usecase';

const getAllInventoryTypesUseCaseFactory = () => new GetInventoryTypesUseCase();
export const getAllInventoryTypesUseCaseProvider = {
  provide: GetInventoryTypesUseCase,
  useFactory: getAllInventoryTypesUseCaseFactory,
  deps: [InventoryTypeGateway]
}


const getInventoryTypeByIdUseCaseFactory = () => new GetInventoryTypeByIdUseCase();
export const getInventoryTypeByIdUseCaseProvider = {
  provide: GetInventoryTypeByIdUseCase,
  useFactory: getInventoryTypeByIdUseCaseFactory,
  deps: [InventoryTypeGateway]
}

const saveInventoryTypeUseCaseFactory = () => new SaveInventoryTypeUseCase();
export const saveInventoryTypeUseCaseProvider = {
  provide: SaveInventoryTypeUseCase,
  useFactory: saveInventoryTypeUseCaseFactory,
  deps: [InventoryTypeGateway]
}

const updateInventoryTypeUseCaseFactory = () => new UpdateInventoryTypeUseCase();
export const updateInventoryTypeUseCaseProvider = {
  provide: UpdateInventoryTypeUseCase,
  useFactory: updateInventoryTypeUseCaseFactory,
  deps: [InventoryTypeGateway]
}

const deleteInventoryTypeUseCaseFactory = () => new DeleteInventoryTypeUseCase();
export const deleteInventoryTypeUseCaseProvider = {
  provide: DeleteInventoryTypeUseCase,
  useFactory: deleteInventoryTypeUseCaseFactory,
  deps: [InventoryTypeGateway]
}
