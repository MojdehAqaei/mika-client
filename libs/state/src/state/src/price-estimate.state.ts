import { signal, WritableSignal } from "@angular/core";
import { PriceEstimateModel } from "@domain/lib/purchase-and-orders";

export interface PriceEstimateState {
    SelectedPriceEstimate$: WritableSignal<PriceEstimateModel>;
    editMode$: WritableSignal<boolean>;
}

export const priceEstimateInitialState: PriceEstimateState = {
    SelectedPriceEstimate$: signal<PriceEstimateModel>({}),
    editMode$: signal<boolean>(false),
} as const
