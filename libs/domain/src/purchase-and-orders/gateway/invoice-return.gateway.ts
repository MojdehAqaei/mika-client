import { Observable } from "rxjs";
import { Gateway } from "../../gateway";
import { InvoiceReturnItemModel } from "../model/Invoice-return-item.model";
import { InvoiceReturnModel } from "../model/invoice-return.model";

export abstract class InvoiceReturnGateway extends Gateway<InvoiceReturnModel> {
    abstract updateInvoiceReturnState(params: InvoiceReturnModel): Observable<InvoiceReturnItemModel>;
}
