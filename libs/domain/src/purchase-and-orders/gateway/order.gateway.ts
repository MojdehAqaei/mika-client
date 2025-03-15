import { SelectItem } from "@view/lib/models";
import { Observable } from "rxjs";
import { Gateway } from "../../gateway";
import { OrderStateEnum } from "../enum/order-state.enum";
import { OrderModel } from "../model/order.model";

export abstract class OrderGateway extends Gateway<OrderModel> {
  abstract getOrderListByState(state: OrderStateEnum): Observable<SelectItem<OrderModel>[]>;
  abstract updateOrderState(params: OrderModel): Observable<OrderModel>;
}
