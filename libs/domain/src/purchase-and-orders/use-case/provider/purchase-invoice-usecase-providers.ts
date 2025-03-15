import { PurchaseInvoiceGateway } from '../../gateway/purchase-invoice.gateway';
import { ChangePurchaseInvoiceStateUseCase } from '../change-purchase-invoice-state.usecase';
import { DeletePurchaseInvoiceUseCase } from '../delete-purchase-invoice.usecase';
import { GetPurchaseInvoiceListByStateUseCase } from '../get-purchase-invoice-list-by-state.usecasse';
import { GetPurchaseInvoiceListUseCase } from '../get-purchase-invoice-list.usecase';
import { SavePurchaseInvoiceUseCase } from '../save-purchase-invoice.usecase';
import { UpdatePurchaseInvoiceUseCase } from '../update-purchase-invoice.usecase';

const getPurchaseInvoiceListUseCaseFactory = () =>
  new GetPurchaseInvoiceListUseCase();
export const getPurchaseInvoiceListUseCaseProvider = {
  provide: GetPurchaseInvoiceListUseCase,
  useFactory: getPurchaseInvoiceListUseCaseFactory,
  deps: [PurchaseInvoiceGateway],
};

const deletePurchaseInvoiceUseCaseFactory = () =>
  new DeletePurchaseInvoiceUseCase();
export const deletePurchaseInvoiceUseCaseProvider = {
  provide: DeletePurchaseInvoiceUseCase,
  useFactory: deletePurchaseInvoiceUseCaseFactory,
  deps: [PurchaseInvoiceGateway],
};

const savePurchaseInvoiceUseCaseFactory = () =>
  new SavePurchaseInvoiceUseCase();
export const savePurchaseInvoiceUseCaseProvider = {
  provide: SavePurchaseInvoiceUseCase,
  useFactory: savePurchaseInvoiceUseCaseFactory,
  deps: [PurchaseInvoiceGateway],
};

const updatePurchaseInvoiceUseCaseFactory = () =>
  new UpdatePurchaseInvoiceUseCase();
export const updatePurchaseInvoiceUseCaseProvider = {
  provide: UpdatePurchaseInvoiceUseCase,
  useFactory: updatePurchaseInvoiceUseCaseFactory,
  deps: [PurchaseInvoiceGateway],
};


const updatePurchaseInvoiceStateUseCaseFactory = () =>
  new ChangePurchaseInvoiceStateUseCase();
export const updatePurchaseInvoiceStateUseCaseProvider = {
  provide: ChangePurchaseInvoiceStateUseCase,
  useFactory: updatePurchaseInvoiceStateUseCaseFactory,
  deps: [PurchaseInvoiceGateway],
};

const getPurchaseInvoiceListByStateUseCaseFactory = () => new GetPurchaseInvoiceListByStateUseCase();
export const getPurchaseInvoiceListByStateUseCaseProvider = {
  provide: GetPurchaseInvoiceListByStateUseCase,
  useFactory: getPurchaseInvoiceListByStateUseCaseFactory,
  deps: [PurchaseInvoiceGateway],
};
