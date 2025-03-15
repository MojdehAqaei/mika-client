import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureGateway, FeatureModel } from '@domain/lib/base-data';

export class DeleteFeatureUseCase implements UseCase<number, FeatureModel> {
  readonly #featureGateway = inject(FeatureGateway);

  execute(id: number ): Observable<any> {
    return this.#featureGateway.deleteById(id);
  }
}
