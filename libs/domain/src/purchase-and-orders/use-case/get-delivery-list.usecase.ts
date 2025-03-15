import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsDeliveryGateway } from '../gateway/goods-delivery.gateway';
import { AppStore } from '@state/lib/store';
import { GoodsDeliveryModel } from '../model/goods-delivery.model';


export class GetDeliveryListUseCase implements UseCase<GoodsDeliveryModel, GoodsDeliveryModel[]> {
  readonly #goodsDeliveryGateway = inject(GoodsDeliveryGateway);
  readonly #appStore = inject(AppStore);

  execute(filters: GoodsDeliveryModel): Observable<GoodsDeliveryModel[]> {
    filters.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#goodsDeliveryGateway.filterAll(filters);
  }
}
