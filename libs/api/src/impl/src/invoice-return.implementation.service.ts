import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InvoiceReturnMapper } from "@api/lib/mapper";
import { InvoiceReturnGateway, InvoiceReturnModel, PurchaseInvoiceItemModel } from '@domain/lib/purchase-and-orders';
import { EndpointsEnum } from "@view/lib/data-types";
import { EMPTY, Observable, map } from "rxjs";
import { InvoiceReturnDto } from "../../dto";
import { BaseService } from "../../misc";

@Injectable({
  providedIn: 'root'
})

export class invoiceReturnImplementationService extends BaseService<InvoiceReturnDto> implements InvoiceReturnGateway {
  readonly #invoiceReturnMapper = new InvoiceReturnMapper();

  constructor() {
    super();
  }

  searchByKey(key: string): Observable<InvoiceReturnModel[]> {
    return EMPTY;
  }

  filterAll(filters: InvoiceReturnModel): Observable<InvoiceReturnModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`invoice-return/${EndpointsEnum.filterAll} `, this.#invoiceReturnMapper.mapFrom(filters), { params: httpParams }).pipe(
      map(res => (res as InvoiceReturnDto[])?.map(this.#invoiceReturnMapper.mapTo)),
    );
  }

  create(body: InvoiceReturnModel): Observable<InvoiceReturnModel> {
    return this.post(`invoice-return/${EndpointsEnum.create}`, this.#invoiceReturnMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#invoiceReturnMapper.mapTo(res as InvoiceReturnDto)
      })
    );
  }

  read(id: number): Observable<InvoiceReturnModel> {
    return EMPTY;
  }

  update(body: InvoiceReturnModel): Observable<InvoiceReturnModel> {
    return this.put(`invoice-return/${EndpointsEnum.update}/${body.id}`, this.#invoiceReturnMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#invoiceReturnMapper.mapTo(res as InvoiceReturnDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`invoice-return/${EndpointsEnum.delete}/${id}`);
  }
  findAll(): Observable<InvoiceReturnModel[]> {
    return this.getAll(`invoice-return/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(this.#invoiceReturnMapper.mapTo))
    );
  }

  updateInvoiceReturnState(params: InvoiceReturnModel): Observable<PurchaseInvoiceItemModel> {
    return this.put(`invoice-return/change-stage/${params.id}/${params.nextState}`, this.#invoiceReturnMapper.mapFrom(params)).pipe(
      map(res => {
        return this.#invoiceReturnMapper.mapTo(res as InvoiceReturnDto)
      })
    );
  }

}
