import { signal, WritableSignal } from "@angular/core";

export class Store<T> {

    readonly #state$: WritableSignal<T>;

    constructor(initialState: T) {
        this.#state$ = signal(initialState);
    }

    public get state$(): WritableSignal<T> {
        return this.#state$;
    }

    // public select<U>(selectFn: (state: T) => U): WritableSignal<U> {
    //   return this.state$().pipe(
    //     map(selectFn)
    //   );
    // }

    public updateState(updateFn: (state: T) => T): void {
        this.#state$.update(updateFn);
    }

    public updateField<K extends keyof T>(field: K, value: T[K] extends WritableSignal<infer U> ? U : never): void {
        const currentState = this.state$();
        const fieldSignal = currentState[field] as WritableSignal<any>;

        if (fieldSignal?.set) {
            fieldSignal.set(value);
        } else {
            throw new Error(`Field "${String(field)}" is not a WritableSignal.`);
        }
    }
}
