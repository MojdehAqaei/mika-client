import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GoodsDeliveryGateway } from '../gateway/goods-delivery.gateway';
import { AppStore } from '@state/lib/store';
import { GoodsDeliveryModel } from '../model/goods-delivery.model';
import { AttachmentModel } from '@domain/lib/document-management';


export class ExportDeliveryListExcelFileUseCase implements UseCase<GoodsDeliveryModel, AttachmentModel> {
  readonly #goodsDeliveryGateway = inject(GoodsDeliveryGateway);
  readonly #appStore = inject(AppStore);

  execute(filters: GoodsDeliveryModel): Observable<AttachmentModel> {
    filters.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#goodsDeliveryGateway.exportExcel(filters);
  }
}
