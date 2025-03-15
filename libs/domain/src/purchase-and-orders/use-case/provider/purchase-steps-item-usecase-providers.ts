import { PurchaseStepsItemGateway } from '../../gateway/purchase-steps-item.gateway';
import { DeletePurchaseStepsItemUseCase } from '../delete-purchase-steps-item.usecase';
import { GetPurchaseStepTypeListUseCase } from '../get-purchase-step-type-list.usecase';
import { GetPurchaseStepsItemListUseCase } from '../get-purchase-steps-item-list.usecase';
import { SavePurchaseStepsItemUseCase } from '../save-purchase-steps-item.usecase';

const getPurchaseStepsItemListUseCaseFactory = () =>
  new GetPurchaseStepsItemListUseCase();
export const getPurchaseStepsItemListUseCaseProvider = {
  provide: GetPurchaseStepsItemListUseCase,
  useFactory: getPurchaseStepsItemListUseCaseFactory,
  deps: [PurchaseStepsItemGateway],
};

const deletePurchaseStepsItemUseCaseFactory = () =>
  new DeletePurchaseStepsItemUseCase();
export const deletePurchaseStepsItemUseCaseProvider = {
  provide: DeletePurchaseStepsItemUseCase,
  useFactory: deletePurchaseStepsItemUseCaseFactory,
  deps: [PurchaseStepsItemGateway],
};

const savePurchaseStepsItemUseCaseFactory = () =>
  new SavePurchaseStepsItemUseCase();
export const savePurchaseStepsItemUseCaseProvider = {
  provide: SavePurchaseStepsItemUseCase,
  useFactory: savePurchaseStepsItemUseCaseFactory,
  deps: [PurchaseStepsItemGateway],
};

const getPurchaseStepTypeListUseCaseFactory = () =>
  new GetPurchaseStepTypeListUseCase();
export const getPurchaseStepTypeListUseCase = {
  provide: GetPurchaseStepTypeListUseCase,
  useFactory: getPurchaseStepTypeListUseCaseFactory,
  deps: [PurchaseStepsItemGateway],
};
