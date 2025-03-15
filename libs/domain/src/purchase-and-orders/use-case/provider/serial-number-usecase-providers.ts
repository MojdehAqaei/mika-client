import { GoodsDeliveryItemGateway } from '../../gateway/goods-delivery-item.gateway';
import { GetAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase } from '../get-available-informatics-serial-numbers-by-delivery-item-id.usecase';
import {
  GetAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase
} from '../get-all-selectable-informatics-serial-numbers-by-delivery-item-id.usecase';


const getAvailableInformaticsSerialNumbersByDeliveryItemIdUseCaseFactory = () => new GetAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase();
export const getAvailableInformaticsSerialNumbersByDeliveryItemIdUseCaseProvider = {
  provide: GetAvailableInformaticsSerialNumbersByDeliveryItemIdUseCase,
  useFactory: getAvailableInformaticsSerialNumbersByDeliveryItemIdUseCaseFactory,
  deps: [GoodsDeliveryItemGateway]
};



const getAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCaseFactory = () => new GetAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase();
export const getAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCaseProvider = {
  provide: GetAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCase,
  useFactory: getAllSelectableInformaticsSerialNumbersByDeliveryItemIdUseCaseFactory,
  deps: [GoodsDeliveryItemGateway]
};
