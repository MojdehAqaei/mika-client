import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InvoiceStateEnum, PurchaseInvoiceGateway, PurchaseInvoiceItemModel, PurchaseInvoiceModel } from '@domain/lib/purchase-and-orders';
import { EndpointsEnum } from "@view/lib/data-types";
import { SelectItem } from "@view/lib/models";
import { EMPTY, Observable, map } from "rxjs";
import { PurchaseInvoiceDto } from "../../dto";
import { PurchaseInvoiceMapper, PurchaseInvoiceSelectItemMapper } from "../../mapper";
import { BaseService } from "../../misc";

@Injectable({
  providedIn: 'root'
})

export class PurchaseInvoiceImplementationService extends BaseService<PurchaseInvoiceDto> implements PurchaseInvoiceGateway {
  readonly #purchaseInvoiceMapper = new PurchaseInvoiceMapper();
  readonly #purchaseInvoiceItemMapper = new PurchaseInvoiceSelectItemMapper();

  constructor() {
    super();
  }

  searchByKey(key: string): Observable<PurchaseInvoiceModel[]> {
    return EMPTY;
  }

  filterAll(filters: PurchaseInvoiceModel): Observable<PurchaseInvoiceModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`invoice/${EndpointsEnum.filterAll} `, this.#purchaseInvoiceMapper.mapFrom(filters), { params: httpParams }).pipe(
      map(res => (res as PurchaseInvoiceDto[])?.map(this.#purchaseInvoiceMapper.mapTo)),
    );
  }

  create(body: PurchaseInvoiceModel): Observable<PurchaseInvoiceModel> {
    return this.post(`invoice/${EndpointsEnum.create}`, this.#purchaseInvoiceMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#purchaseInvoiceMapper.mapTo(res as PurchaseInvoiceDto)
      })
    );
  }

  read(id: number): Observable<PurchaseInvoiceModel> {
    return EMPTY;
  }

  update(body: PurchaseInvoiceModel): Observable<PurchaseInvoiceModel> {
    return this.put(`invoice/${EndpointsEnum.update}/${body.id}`, this.#purchaseInvoiceMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#purchaseInvoiceMapper.mapTo(res as PurchaseInvoiceDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`invoice/${EndpointsEnum.delete}/${id}`);
  }
  findAll(): Observable<PurchaseInvoiceModel[]> {
    return this.getAll(`invoice/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(this.#purchaseInvoiceMapper.mapTo))
    );
  }

  updatePurchaseInvoiceState(params: PurchaseInvoiceModel): Observable<PurchaseInvoiceItemModel> {
    return this.put(`invoice/change-stage/${params.id}/${params.nextState}`, this.#purchaseInvoiceMapper.mapFrom(params)).pipe(
      map(res => {
        return this.#purchaseInvoiceMapper.mapTo(res as PurchaseInvoiceDto)
      })
    );
  }

  getPurchaseInvoiceListByState(state: InvoiceStateEnum): Observable<SelectItem<PurchaseInvoiceModel>[]> {
    const params = new HttpParams().set('filter', '');
    return this.getAll(`invoice/search-by-stage/${state}`, { params }, true)
      .pipe(
        map(res => res.map(each => ({
          label: String(each.documentNumber),
          value: this.#purchaseInvoiceItemMapper.mapTo(each)
        }))),
      );
  }

}
