import { inject, Injectable } from "@angular/core";
import {
  GetPriceEstimateByOrderIdUseCase,
  PriceEstimateModel,
  SavePriceEstimateUseCase,
  UpdatePriceEstimateUseCase
} from "@domain/lib/purchase-and-orders";
import { OrderStore, PriceEstimateStore } from "@state/lib/store";

@Injectable()
export class PriceEstimateFacade {
  public readonly priceEstimateStore = inject(PriceEstimateStore);
  public readonly orderStore = inject(OrderStore);
  readonly #updatePriceEstimateUseCase = inject(UpdatePriceEstimateUseCase);
  readonly #savePriceEstimateUseCase = inject(SavePriceEstimateUseCase);
  readonly #getPriceEstimateByOrderId = inject(GetPriceEstimateByOrderIdUseCase);

  updateSelectedPriceEstimate(priceEstimate: PriceEstimateModel) {
    this.priceEstimateStore.updateSelectedPriceEstimate(priceEstimate);
  }

  getPriceEstimateByOrderId(orderId: number) {
    this.#getPriceEstimateByOrderId.execute(orderId).subscribe({
      next: (res) => {
        this.priceEstimateStore.updateSelectedPriceEstimate(res);
      },
    });
  }

  savePriceEstimate(priceEstimate: PriceEstimateModel) {
    this.orderStore.updateDialogLoading(true);
    this.#savePriceEstimateUseCase.execute(priceEstimate).subscribe({
      next: (res) => {
        this.orderStore.updateDialogLoading(false);
        this.orderStore.updateDialogVisibility(false);
      },
    });
  }

  updatePriceEstimate(priceEstimate: PriceEstimateModel) {
    this.#updatePriceEstimateUseCase.execute(priceEstimate).subscribe({
      next: (res) => {
        this.orderStore.updateDialogLoading(false);
      },
    });
  }
}
