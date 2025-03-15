import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CountingUnitGateway, CountingUnitModel } from '@domain/lib/base-data';

export class UpdateCountingUnitUseCase implements UseCase<CountingUnitModel, CountingUnitModel> {
  readonly #countingUnitGateway = inject(CountingUnitGateway);

  execute(params: CountingUnitModel): Observable<CountingUnitModel> {
    return this.#countingUnitGateway.update(params);
  }
}
