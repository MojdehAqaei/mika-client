import { inject } from "@angular/core";
import { ClSelectItem } from "@sadad/component-lib/src/models";
import { Observable } from "rxjs";
import { UseCase } from "../../use-case";
import { InvoiceStateEnum } from "../enum/invoice-state.enum";
import { PurchaseInvoiceGateway } from "../gateway/purchase-invoice.gateway";

export class GetPurchaseInvoiceListByStateUseCase implements UseCase<InvoiceStateEnum, ClSelectItem[]> {

  readonly #purchaseInvoiceGateway = inject(PurchaseInvoiceGateway);
  execute(params: InvoiceStateEnum): Observable<ClSelectItem[]> {
    return this.#purchaseInvoiceGateway.getPurchaseInvoiceListByState(params)
  }
}
