import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PurchaseStepsGateway, PurchaseStepsModel } from '@domain/lib/purchase-and-orders';
import { EndpointsEnum } from "@view/lib/data-types";
import { EMPTY, Observable, map } from "rxjs";
import { PurchaseStepsDto } from "../../dto";
import { PurchaseStepsMapper } from "../../mapper";
import { BaseService } from "../../misc";

@Injectable({
  providedIn: 'root'
})

export class PurchaseStepsImplementationService extends BaseService<PurchaseStepsDto> implements PurchaseStepsGateway {
  readonly #purchaseStepsMapper = new PurchaseStepsMapper();

  constructor() {
    super();
  }

  searchByKey(key: string): Observable<PurchaseStepsModel[]> {
    return EMPTY;
  }

  filterAll(filters: PurchaseStepsModel): Observable<PurchaseStepsModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`purchase-reference/${EndpointsEnum.filterAll} `, this.#purchaseStepsMapper.mapFrom(filters), { params: httpParams }).pipe(
      map(res => (res as PurchaseStepsDto[])?.map(this.#purchaseStepsMapper.mapTo)),
    );
  }

  create(body: PurchaseStepsModel): Observable<PurchaseStepsModel> {
    return this.post(`purchase-reference/${EndpointsEnum.create}`, this.#purchaseStepsMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#purchaseStepsMapper.mapTo(res as PurchaseStepsDto)
      })
    );
  }

  read(id: number): Observable<PurchaseStepsModel> {
    return EMPTY;
  }

  update(body: PurchaseStepsModel): Observable<PurchaseStepsModel> {
    return this.put(`purchase-reference/${EndpointsEnum.update}/${body.id}`, this.#purchaseStepsMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#purchaseStepsMapper.mapTo(res as PurchaseStepsDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`purchase-reference/${EndpointsEnum.delete}/${id}`);
  }

  findAll(): Observable<PurchaseStepsModel[]> {
    return this.getAll(`purchase-reference/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(this.#purchaseStepsMapper.mapTo))
    );
  }

  updatePurchaseStepsState(params: PurchaseStepsModel): Observable<PurchaseStepsModel> {
    return this.put(`purchase-reference/change-stage/${params.id}/${params.nextState}`, this.#purchaseStepsMapper.mapFrom(params)).pipe(
      map(res => {
        return this.#purchaseStepsMapper.mapTo(res as PurchaseStepsDto)
      })
    );
  }

}
