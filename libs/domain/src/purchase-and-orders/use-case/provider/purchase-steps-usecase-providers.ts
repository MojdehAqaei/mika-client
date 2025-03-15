import { PurchaseStepsGateway } from '../../gateway/purchase-steps.gateway';
import { ChangePurchaseStepsStateUseCase } from '../change-purchase-steps-state.usecase';
import { DeletePurchaseStepsUseCase } from '../delete-purchase-steps.usecase';
import { GetPurchaseStepsListUseCase } from '../get-purchase-steps-list.usecase';
import { SavePurchaseStepsUseCase } from '../save-purchase-steps.usecase';
import { UpdatePurchaseStepsUseCase } from '../update-purchase-steps.usecase';

const getPurchaseStepsListUseCaseFactory = () =>
  new GetPurchaseStepsListUseCase();
export const getPurchaseStepsListUseCaseProvider = {
  provide: GetPurchaseStepsListUseCase,
  useFactory: getPurchaseStepsListUseCaseFactory,
  deps: [PurchaseStepsGateway],
};

const deletePurchaseStepsUseCaseFactory = () =>
  new DeletePurchaseStepsUseCase();
export const deletePurchaseStepsUseCaseProvider = {
  provide: DeletePurchaseStepsUseCase,
  useFactory: deletePurchaseStepsUseCaseFactory,
  deps: [PurchaseStepsGateway],
};

const savePurchaseStepsUseCaseFactory = () =>
  new SavePurchaseStepsUseCase();
export const savePurchaseStepsUseCaseProvider = {
  provide: SavePurchaseStepsUseCase,
  useFactory: savePurchaseStepsUseCaseFactory,
  deps: [PurchaseStepsGateway],
};

const updatePurchaseStepsUseCaseFactory = () =>
  new UpdatePurchaseStepsUseCase();
export const updatePurchaseStepsUseCaseProvider = {
  provide: UpdatePurchaseStepsUseCase,
  useFactory: updatePurchaseStepsUseCaseFactory,
  deps: [PurchaseStepsGateway],
};


const updatePurchaseStepsStateUseCaseFactory = () =>
  new ChangePurchaseStepsStateUseCase();
export const updatePurchaseStepsStateUseCaseProvider = {
  provide: ChangePurchaseStepsStateUseCase,
  useFactory: updatePurchaseStepsStateUseCaseFactory,
  deps: [PurchaseStepsGateway],
};
