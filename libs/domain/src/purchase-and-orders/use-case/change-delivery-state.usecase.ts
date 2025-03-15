import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { GoodsDeliveryGateway } from '../gateway/goods-delivery.gateway';
import { GoodsDeliveryModel, GoodsDeliveryModelFilter } from '../model/goods-delivery.model';
import { GoodsDeliveryStateEnum } from '../enum/goods-delivery-state.enum';

export class ChangeDeliveryStateUseCase implements UseCase<GoodsDeliveryModel, GoodsDeliveryModel> {
  readonly #goodsDeliveryGateway = inject(GoodsDeliveryGateway);

  execute(params: GoodsDeliveryModel): Observable<GoodsDeliveryModel> {
    Object.keys(params).forEach(each => {
      if (each != 'id' &&
          each != 'nextState' &&
          each != 'sendDate' &&
          each != 'receiverFullName' &&
          each != 'sourceAdditionalComments' &&
          each != 'receiveDate' &&
          each != 'delivererFullName' &&
          each != 'destinationAdditionalComments'
      ) {
        delete params[each as GoodsDeliveryModelFilter];
      }

      if (params.nextState == GoodsDeliveryStateEnum.SENT_FROM_SOURCE) {
        delete params.delivererFullName;
        delete params.destinationAdditionalComments;
        delete params.receiveDate;

      } else if (params.nextState == GoodsDeliveryStateEnum.RECEIVED_AT_DESTINATION) {
        delete params.receiverFullName;
        delete params.sourceAdditionalComments;
        delete params.sendDate;
      }
    })
    return this.#goodsDeliveryGateway.updateDeliveryState(params)
  }
}
