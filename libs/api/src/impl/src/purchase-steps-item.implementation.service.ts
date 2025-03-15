import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PurchaseStepsItemGateway, PurchaseStepsItemModel, PurchaseStepTypeModel } from '@domain/lib/purchase-and-orders';
import { EndpointsEnum } from "@view/lib/data-types";
import { SelectItem } from "@view/lib/models";
import { EMPTY, map, Observable } from "rxjs";
import { PurchaseStepsItemDto, PurchaseStepTypeDto } from "../../dto";
import { PurchaseStepsItemMapper } from "../../mapper";
import { BaseService } from "../../misc";

@Injectable({
  providedIn: 'root'
})

export class PurchaseStepsItemImplementationService extends BaseService<PurchaseStepsItemDto> implements PurchaseStepsItemGateway {
  readonly #purchaseStepsItemMapper = new PurchaseStepsItemMapper();

  constructor() {
    super();
  }

  searchByKey(key: string): Observable<PurchaseStepsItemModel[]> {
    return EMPTY;
  }

  filterAll(filters: PurchaseStepsItemModel): Observable<PurchaseStepsItemModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`purchase-reference-step/${EndpointsEnum.filterAll} `, this.#purchaseStepsItemMapper.mapFrom(filters), { params: httpParams }).pipe(
      map(res => (res as PurchaseStepsItemDto[])?.map(this.#purchaseStepsItemMapper.mapTo)),
    );
  }

  create(body: PurchaseStepsItemModel): Observable<PurchaseStepsItemModel> {
    return this.post(`purchase-reference-step/${EndpointsEnum.create}/${body.purchaseStep?.id}`, this.#purchaseStepsItemMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#purchaseStepsItemMapper.mapTo(res as PurchaseStepsItemDto)
      })
    );
  }

  read(id: number): Observable<PurchaseStepsItemModel> {
    return EMPTY;
  }

  update(body: PurchaseStepsItemModel): Observable<PurchaseStepsItemModel> {
    return this.put(`purchase-reference-step/${EndpointsEnum.update}/${body.id}`, this.#purchaseStepsItemMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#purchaseStepsItemMapper.mapTo(res as PurchaseStepsItemDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`purchase-reference-step/${EndpointsEnum.delete}/${id}`);
  }

  findAll(): Observable<PurchaseStepsItemModel[]> {
    return this.getAll(`purchase-reference-step/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(this.#purchaseStepsItemMapper.mapTo))
    );
  }

  getPurchaseStepType(params: PurchaseStepTypeModel): Observable<SelectItem[]> {
    return this.post(`purchase-reference-step-type/fetch-purchase-reference`, params)
      .pipe(
        map(res => (res as PurchaseStepTypeDto[]).map(each => ({
          label: String(each.title),
          value: each.id
        }))),
      );
  }
}
