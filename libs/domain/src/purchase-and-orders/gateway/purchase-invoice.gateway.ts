import { SelectItem } from "@view/lib/models";
import { Observable } from "rxjs";
import { Gateway } from "../../gateway";
import { InvoiceStateEnum } from "../enum/invoice-state.enum";
import { PurchaseInvoiceModel } from "../model/purchase-invoice.model";

export abstract class PurchaseInvoiceGateway extends Gateway<PurchaseInvoiceModel> {
  abstract updatePurchaseInvoiceState(params: PurchaseInvoiceModel): Observable<PurchaseInvoiceModel>;
  abstract getPurchaseInvoiceListByState(state: InvoiceStateEnum): Observable<SelectItem<PurchaseInvoiceModel>[]>;
}
