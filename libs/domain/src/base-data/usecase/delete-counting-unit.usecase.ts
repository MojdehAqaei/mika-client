import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CountingUnitGateway, CountingUnitModel } from '@domain/lib/base-data';

export class DeleteCountingUnitUseCase implements UseCase<number, CountingUnitModel> {
  readonly #countingUnitGateway = inject(CountingUnitGateway);

  execute(id: number): Observable<null> {
    return this.#countingUnitGateway.deleteById(id);
  }
}
