import { OrderGateway } from "../../gateway/order.gateway";
import { GetOrderListByStateUseCase } from "../get-order-list-by-state.usecasse";
import { GetOrderListUseCase } from '../get-order-list.usecase';
import { DeleteOrderUseCase } from '../delete-order.usecase';
import { ChangeOrderStateUseCase } from '../change-order-state.usecase';
import { SaveOrderUseCase } from '../save-order.usecase';
import { UpdateOrderUseCase } from '../update-order.usecase';

const getOrderListUseCaseFactory = () => new GetOrderListUseCase();
export const getOrderListUseCaseProvider = {
  provide: GetOrderListUseCase,
  useFactory: getOrderListUseCaseFactory,
  deps: [OrderGateway],
};


const getOrderListByStateUseCaseFactory = () => new GetOrderListByStateUseCase();
export const getOrderListByStateUseCaseProvider = {
  provide: GetOrderListByStateUseCase,
  useFactory: getOrderListByStateUseCaseFactory,
  deps: [OrderGateway],
};


const deleteOrderUseCaseFactory = () => new DeleteOrderUseCase();
export const deleteOrderUseCaseProvider = {
  provide: DeleteOrderUseCase,
  useFactory: deleteOrderUseCaseFactory,
  deps: [OrderGateway],
};


const changeOrderStateUseCaseFactory = () => new ChangeOrderStateUseCase();
export const changeOrderStateUseCaseProvider = {
  provide: ChangeOrderStateUseCase,
  useFactory: changeOrderStateUseCaseFactory,
  deps: [OrderGateway],
};


const saveOrderUseCaseFactory = () => new SaveOrderUseCase();
export const saveOrderUseCaseProvider = {
  provide: SaveOrderUseCase,
  useFactory: saveOrderUseCaseFactory,
  deps: [OrderGateway],
};



const updateOrderUseCaseFactory = () => new UpdateOrderUseCase();
export const updateOrderUseCaseProvider = {
  provide: UpdateOrderUseCase,
  useFactory: updateOrderUseCaseFactory,
  deps: [OrderGateway],
};
