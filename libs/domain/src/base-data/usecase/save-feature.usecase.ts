import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { FeatureGateway } from '../gateway/feature.gateway';
import { FeatureModel } from '../model/feature.model';

export class SaveFeatureUseCase implements UseCase<object, FeatureModel> {
  readonly #featureGateway = inject(FeatureGateway);
  execute(params: FeatureModel): Observable<FeatureModel> {
    return this.#featureGateway.create(params);
  }
}
