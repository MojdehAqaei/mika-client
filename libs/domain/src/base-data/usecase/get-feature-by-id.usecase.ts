import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { FeatureGateway } from '../gateway/feature.gateway';
import { FeatureModel } from '../model/feature.model';

export class GetFeatureByIdUseCase implements UseCase<number, FeatureModel> {
  readonly #featureGateway = inject(FeatureGateway);
  execute(id: number ): Observable<FeatureModel> {
    return this.#featureGateway.read(id);
  }
}
