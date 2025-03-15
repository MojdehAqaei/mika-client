import { signal, WritableSignal } from '@angular/core';
import { FeatureModel } from '@domain/lib/base-data';
import { Crud } from "@view/lib/data-types";

export interface FeatureState {
  readonly features$: WritableSignal<FeatureModel[]>;
  readonly selectedFeature$: WritableSignal<FeatureModel>,
  readonly searchFilterLabels$: WritableSignal<string[]>,
  readonly pageNumber$: WritableSignal<number>,
  readonly pageSize$: WritableSignal<number>,
  readonly total$: WritableSignal<number>,
  readonly editMode$: WritableSignal<boolean>,
  readonly dialogLoading$: WritableSignal<boolean>,
  readonly dialogVisible$: WritableSignal<boolean>,
  readonly allowedActions$: WritableSignal<(Crud | undefined)[]>
}

export const featureInitialState: FeatureState = {
  features$: signal<FeatureModel[]>([]),
  selectedFeature$: signal<FeatureModel>({}),
  searchFilterLabels$: signal<string[]>([]),
  pageNumber$: signal<number>(0),
  pageSize$: signal<number>(10),
  total$: signal<number>(0),
  editMode$: signal<boolean>(false),
  dialogLoading$: signal<boolean>(false),
  dialogVisible$: signal<boolean>(false),
  allowedActions$: signal<(Crud | undefined)[]>([])
} as const
