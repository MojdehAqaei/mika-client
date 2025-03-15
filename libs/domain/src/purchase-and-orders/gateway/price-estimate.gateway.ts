import { Observable } from "rxjs";
import { Gateway } from "../../gateway";
import { PriceEstimateModel } from "../model/price-estimate.model";

export abstract class PriceEstimateGateway extends Gateway<PriceEstimateModel> {
    abstract getPriceEstimateByOrderId(orderId: number): Observable<PriceEstimateModel>
}
