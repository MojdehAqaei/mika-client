import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { FeatureGateway } from '../gateway/feature.gateway';
import { FeatureModel } from '@domain/lib/base-data';

export class UpdateFeatureUseCase implements UseCase<any, FeatureModel> {
  readonly #featureGateway = inject(FeatureGateway);
  execute(params: FeatureModel): Observable<FeatureModel> {
    return this.#featureGateway.update(params);
  }
}
