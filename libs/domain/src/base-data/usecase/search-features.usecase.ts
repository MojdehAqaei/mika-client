import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { FeatureGateway } from '../gateway/feature.gateway';
import { FeatureModel } from '@domain/lib/base-data';

export class SearchFeaturesUseCase implements UseCase<object, FeatureModel[]> {
  readonly #featureGateway = inject(FeatureGateway);

  execute(param: FeatureModel): Observable<FeatureModel[]> {
    return this.#featureGateway.filterAll(param);
  }
}
