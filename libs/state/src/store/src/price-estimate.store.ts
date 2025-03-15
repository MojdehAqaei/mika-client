import { Injectable, Signal } from "@angular/core";
import { PriceEstimateModel } from "@domain/lib/purchase-and-orders";
import { priceEstimateInitialState, PriceEstimateState } from "@state/lib/state";
import { Store } from "../store";

@Injectable()
export class PriceEstimateStore {
  #store = new Store<PriceEstimateState>(priceEstimateInitialState);

  public readonly state$: Signal<PriceEstimateState> = this.#store.state$.asReadonly();

  updateSelectedPriceEstimate(priceEstimate: PriceEstimateModel) {
    this.#store.updateField('SelectedPriceEstimate$', priceEstimate);
  }
}
