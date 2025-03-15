import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsDeliveryModel } from '../model/goods-delivery.model';
import { GoodsDeliveryGateway } from '../gateway/goods-delivery.gateway';
import { AppStore } from '@state/lib/store';


export class UpdateGoodsDeliveryUseCase implements UseCase<GoodsDeliveryModel, GoodsDeliveryModel> {
  readonly #goodsDeliveryGateway = inject(GoodsDeliveryGateway);
  readonly #appStore = inject(AppStore);

  execute(params: GoodsDeliveryModel): Observable<GoodsDeliveryModel> {
    delete params.state;
    params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#goodsDeliveryGateway.update(params);
  }
}
