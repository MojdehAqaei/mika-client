import { SelectItem } from "@view/lib/models";
import { Observable } from "rxjs";
import { Gateway } from "../../gateway";
import { PurchaseStepTypeModel } from "../model/purchase-step-type.model";
import { PurchaseStepsItemModel } from "../model/purchase-steps-item.model";

export abstract class PurchaseStepsItemGateway extends Gateway<PurchaseStepsItemModel> {
  abstract getPurchaseStepType(params: PurchaseStepTypeModel): Observable<SelectItem[]>;
}
