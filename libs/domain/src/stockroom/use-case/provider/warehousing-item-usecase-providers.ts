import { GetWarehousingCountRoundUseCase } from '../get-warehousing-count-round.usecase';
import { WarehousingItemGateway } from '../../gateway/warehousing-item.gateway';
import { SaveWarehousingItemsUseCase } from '../save-warehousing-items.usecase';


const getWarehousingCountRoundUseCaseFactory = () => new GetWarehousingCountRoundUseCase();
export const getWarehousingCountRoundUseCaseProvider = {
  provide: GetWarehousingCountRoundUseCase,
  useFactory: getWarehousingCountRoundUseCaseFactory,
  deps: [WarehousingItemGateway]
}



const saveWarehousingItemsUseCaseFactory = () => new SaveWarehousingItemsUseCase();
export const saveWarehousingItemsUseCaseProvider = {
  provide: SaveWarehousingItemsUseCase,
  useFactory: saveWarehousingItemsUseCaseFactory,
  deps: [WarehousingItemGateway]
}


