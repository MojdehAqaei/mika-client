import { inject } from '@angular/core';
import { AppStore } from '@state/lib/store';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { PurchaseInvoiceGateway } from '../gateway/purchase-invoice.gateway';
import { PurchaseInvoiceModel } from '../model/purchase-invoice.model';


export class SavePurchaseInvoiceUseCase implements UseCase<PurchaseInvoiceModel, PurchaseInvoiceModel> {
  readonly #purchaseInvoiceGateway = inject(PurchaseInvoiceGateway);
  readonly #appStore = inject(AppStore);
  execute(params: PurchaseInvoiceModel): Observable<PurchaseInvoiceModel> {
    params.attachedFiles?.forEach((file) => {
      file.relatedEntity = 'INVOICE';
    })
    if (params.invoiceDetail) {
      params.invoiceDetail.invoiceItemList = params.invoiceDetail?.invoiceItemList?.filter(item => item.goods?.id);
    }
    params.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#purchaseInvoiceGateway.create(params);
  }
}
