import { UseCase } from '../../use-case';
import { Observable } from 'rxjs';
import { CountingUnitGateway, CountingUnitModel } from '@domain/lib/base-data';
import { inject } from '@angular/core';
import { ClSelectItem } from '@sadad/component-lib/src/models';

export class GetCountingUnitTypesUseCase implements UseCase<null, ClSelectItem[]> {
  readonly #countingUnitGateway = inject(CountingUnitGateway);

  execute(): Observable<ClSelectItem[]> {
    return this.#countingUnitGateway.getCountingUnitTypes();
  }
}
