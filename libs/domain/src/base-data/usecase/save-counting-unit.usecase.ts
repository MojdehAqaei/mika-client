import { UseCase } from '../../use-case';
import { CountingUnitModel, CountingUnitGateway} from '@domain/lib/base-data';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export class SaveCountingUnitUseCase implements UseCase<CountingUnitModel, CountingUnitModel> {
  readonly #countingUnitGateway = inject(CountingUnitGateway);
  execute(params: CountingUnitModel): Observable<CountingUnitModel> {
    return this.#countingUnitGateway.create(params);
  }
}
