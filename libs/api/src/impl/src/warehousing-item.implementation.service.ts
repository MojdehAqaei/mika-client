import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseService } from '../../misc';
import { WarehousingItemMapper } from '../../mapper';
import { WarehousingItemDto } from '../../dto';
import {
  WarehousingItemGateway,
  WarehousingCountingRoundEnum,
  WarehousingItemModel
} from '@domain/lib/stockroom';


@Injectable({
  providedIn: 'root'
})

export class WarehousingItemImplementationService extends BaseService<WarehousingItemDto> implements WarehousingItemGateway {
  readonly #warehousingItemMapper = new WarehousingItemMapper();

  constructor() {
    super();
  }

  getWarehousingItemsByCountingRound(round: WarehousingCountingRoundEnum): Observable<WarehousingItemModel[]> {
    return this.getAll(``, null, true).pipe(
      map(res => res.map(each => this.#warehousingItemMapper.mapTo(each)))
    );
  }

  saveWarehousingItems(params: WarehousingItemModel[]): Observable<WarehousingItemModel[]> {
    const body = params.map(each => this.#warehousingItemMapper.mapFrom(each));
    return this.post(``, body, null, true).pipe(
      map(res => (res as WarehousingItemDto[])?.map(each => this.#warehousingItemMapper.mapTo(each)) )
    );
  }


}
