import { inject } from "@angular/core";
import { SelectItem } from "@view/lib/models";
import { Observable } from "rxjs";
import { UseCase } from "../../use-case";
import { OrderStateEnum } from "../enum/order-state.enum";
import { OrderGateway } from "../gateway/order.gateway";
import { OrderModel } from "../model/order.model";

export class GetOrderListByStateUseCase implements UseCase<OrderStateEnum, SelectItem<OrderModel>[]> {

  readonly #orderGateway = inject(OrderGateway);
  execute(params: OrderStateEnum): Observable<SelectItem<OrderModel>[]> {
    return this.#orderGateway.getOrderListByState(params)
  }
}
