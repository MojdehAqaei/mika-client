import { GetWarehousingDataUseCase } from '../get-warehousing-data.usecase';
import { WarehousingGateway } from '../../gateway/warehousing.gateway';
import { SaveWarehousingUseCase } from '../save-warehousing.usecase';
import { UpdateWarehousingUseCase } from '../update-warehousing.usecase';
import { DeleteWarehousingUseCase } from '../delete-warehousing.usecase';


const getWarehousingDataUseCaseFactory = () => new GetWarehousingDataUseCase();
export const getWarehousingDataUseCaseProvider = {
  provide: GetWarehousingDataUseCase,
  useFactory: getWarehousingDataUseCaseFactory,
  deps: [WarehousingGateway]
}



const saveWarehousingUseCaseFactory = () => new SaveWarehousingUseCase();
export const saveWarehousingUseCaseProvider = {
  provide: SaveWarehousingUseCase,
  useFactory: saveWarehousingUseCaseFactory,
  deps: [WarehousingGateway]
}



const updateWarehousingUseCaseFactory = () => new UpdateWarehousingUseCase();
export const updateWarehousingUseCaseProvider = {
  provide: UpdateWarehousingUseCase,
  useFactory: updateWarehousingUseCaseFactory,
  deps: [WarehousingGateway]
}


const deleteWarehousingUseCaseFactory = () => new DeleteWarehousingUseCase();
export const deleteWarehousingUseCaseProvider = {
  provide: DeleteWarehousingUseCase,
  useFactory: deleteWarehousingUseCaseFactory,
  deps: [WarehousingGateway]
}
