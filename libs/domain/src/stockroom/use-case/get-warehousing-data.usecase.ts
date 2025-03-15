import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '../../use-case';
import { AppStore } from '@state/lib/store';
import { WarehousingModel } from '../model/warehousing.model';
import { WarehousingGateway } from '../gateway/warehousing.gateway';

export class GetWarehousingDataUseCase implements UseCase<WarehousingModel, WarehousingModel[]> {
  readonly #warehousingGateway = inject(WarehousingGateway);
  readonly #appStore = inject(AppStore);

  execute(filters: WarehousingModel): Observable<WarehousingModel[]> {
    filters.fiscalYearId = this.#appStore.state$().activeFiscalPeriod$()?.id;
    return this.#warehousingGateway.filterAll(filters);
  }
}
