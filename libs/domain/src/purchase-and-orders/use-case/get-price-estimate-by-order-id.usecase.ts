import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "../../use-case";
import { PriceEstimateGateway } from "../gateway/price-estimate.gateway";
import { PriceEstimateModel } from "../model/price-estimate.model";

export class GetPriceEstimateByOrderIdUseCase implements UseCase<number, PriceEstimateModel> {
    readonly #priceEstimateGateway = inject(PriceEstimateGateway);

    execute(params: number): Observable<PriceEstimateModel> {
        return this.#priceEstimateGateway.getPriceEstimateByOrderId(params);
    }
}
