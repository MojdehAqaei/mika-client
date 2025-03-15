import { Injectable } from "@angular/core";
import { Store } from "../store";

@Injectable()
export class OrderStore {
    #store = new Store<OrderState>(orderInitialState);

    public readonly state$: Signal<OrderState> = this.#store.state$.asReadonly();
}
