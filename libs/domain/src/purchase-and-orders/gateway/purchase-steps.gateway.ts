import { Observable } from "rxjs";
import { Gateway } from "../../gateway";
import { PurchaseStepsModel } from "../model/purchase-steps.model";

export abstract class PurchaseStepsGateway extends Gateway<PurchaseStepsModel> {
  abstract updatePurchaseStepsState(params: PurchaseStepsModel): Observable<PurchaseStepsModel>;
}
