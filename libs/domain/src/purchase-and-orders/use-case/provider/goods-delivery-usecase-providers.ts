import { SaveGoodsDeliveryUseCase } from '../save-goods-delivery.usecase';
import { GoodsDeliveryGateway } from '../../gateway/goods-delivery.gateway';
import { UpdateGoodsDeliveryUseCase } from '../update-goods-delivery.usecase';
import { DeleteGoodsDeliveryUseCase } from '../delete-goods-delivery.usecase';
import { GetDeliveryItemsByDeliveryIdUseCase } from '../get-delivery-items-by-delivery-id.usecase';
import { GetDeliveryListUseCase } from '../get-delivery-list.usecase';
import { ChangeDeliveryStateUseCase } from '../change-delivery-state.usecase';
import { GoodsDeliveryItemGateway } from '../../gateway/goods-delivery-item.gateway';
import { UpdateDeliveryItemsListUseCase } from '../update-delivery-items-list.usecase';
import {
  UpdateDeliveryItemsInformaticsSerialNumberListUseCase
} from '../update-delivery-items-informatics-serial-number-list.usecase';
import { ExportDeliveryListExcelFileUseCase } from '../export-delivery-list-excel-file.usecase';
import { ExportDeliverySerialNumbersExcelFileUseCase } from '../export-delivery-serial-numbers-excel-file.usecase';



const getDeliveryListUseCaseFactory = () => new GetDeliveryListUseCase();
export const getDeliveryListUseCaseProvider = {
  provide: GetDeliveryListUseCase,
  useFactory: getDeliveryListUseCaseFactory,
  deps: [GoodsDeliveryGateway]
};


const exportDeliveryListExcelFileUseCaseFactory = () => new ExportDeliveryListExcelFileUseCase();
export const exportDeliveryListExcelFileUseCaseProvider = {
  provide: ExportDeliveryListExcelFileUseCase,
  useFactory: exportDeliveryListExcelFileUseCaseFactory,
  deps: [GoodsDeliveryGateway]
};


const getDeliveryItemsByDeliveryIdUseCaseFactory = () => new GetDeliveryItemsByDeliveryIdUseCase();
export const getDeliveryItemsByDeliveryIdUseCaseProvider = {
  provide: GetDeliveryItemsByDeliveryIdUseCase,
  useFactory: getDeliveryItemsByDeliveryIdUseCaseFactory,
  deps: [GoodsDeliveryGateway]
};



const saveGoodsDeliveryUseCaseFactory = () => new SaveGoodsDeliveryUseCase();
export const saveGoodsDeliveryUseCaseProvider = {
  provide: SaveGoodsDeliveryUseCase,
  useFactory: saveGoodsDeliveryUseCaseFactory,
  deps: [GoodsDeliveryGateway]
};



const updateGoodsDeliveryUseCaseFactory = () => new UpdateGoodsDeliveryUseCase();
export const updateGoodsDeliveryUseCaseProvider = {
  provide: UpdateGoodsDeliveryUseCase,
  useFactory: updateGoodsDeliveryUseCaseFactory,
  deps: [GoodsDeliveryGateway]
};

const changeDeliveryStateUseCaseFactory = () => new ChangeDeliveryStateUseCase();
export const changeDeliveryStateUseCaseProvider = {
  provide: ChangeDeliveryStateUseCase,
  useFactory: changeDeliveryStateUseCaseFactory,
  deps: [GoodsDeliveryGateway]
};


const deleteGoodsDeliveryUseCaseFactory = () => new DeleteGoodsDeliveryUseCase();
export const deleteGoodsDeliveryUseCaseProvide = {
  provide: DeleteGoodsDeliveryUseCase,
  useFactory: deleteGoodsDeliveryUseCaseFactory,
  deps: [GoodsDeliveryGateway]
};


const updateDeliveryItemsListUseCaseFactory = () => new UpdateDeliveryItemsListUseCase();
export const updateDeliveryItemsListUseCaseProvider = {
  provide: UpdateDeliveryItemsListUseCase,
  useFactory: updateDeliveryItemsListUseCaseFactory,
  deps: [GoodsDeliveryItemGateway]
};


const updateDeliveryItemsInformaticsSerialNumberListUseCaseFactory = () => new UpdateDeliveryItemsInformaticsSerialNumberListUseCase();
export const updateDeliveryItemsInformaticsSerialNumberListUseCaseProvider = {
  provide: UpdateDeliveryItemsInformaticsSerialNumberListUseCase,
  useFactory: updateDeliveryItemsInformaticsSerialNumberListUseCaseFactory,
  deps: [GoodsDeliveryItemGateway]
};


const exportDeliverySerialNumbersExcelFileUseCaseFactory = () => new ExportDeliverySerialNumbersExcelFileUseCase();
export const exportDeliverySerialNumbersExcelFileUseCaseProvider = {
  provide: ExportDeliverySerialNumbersExcelFileUseCase,
  useFactory: exportDeliverySerialNumbersExcelFileUseCaseFactory,
  deps: [GoodsDeliveryItemGateway]
};
