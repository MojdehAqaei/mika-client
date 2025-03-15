import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { CountingUnitGateway, CountingUnitModel } from '@domain/lib/base-data';
import { inject } from '@angular/core';

export class GetCountingUnitsUseCase implements UseCase<any, CountingUnitModel[]> {
  readonly #countingUnitGateway = inject(CountingUnitGateway);

  execute(param: CountingUnitModel): Observable<CountingUnitModel[]> {
    return this.#countingUnitGateway.filterAll(param);
  }
}
