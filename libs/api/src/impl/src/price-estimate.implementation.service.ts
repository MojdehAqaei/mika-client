import { Injectable } from "@angular/core";
import { PriceEstimateDto } from "@api/lib/dto";
import { PriceEstimateMapper } from "@api/lib/mapper";
import { BaseService } from "@api/lib/misc";
import { PriceEstimateGateway, PriceEstimateModel } from "@domain/lib/purchase-and-orders";
import { EndpointsEnum } from "@view/lib/data-types";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriceEstimateImplementationService extends BaseService<PriceEstimateDto> implements PriceEstimateGateway {
  readonly #priceEstimateMapper = new PriceEstimateMapper();

  getPriceEstimateByOrderId(orderId: number): Observable<PriceEstimateModel> {
    return this.get(`price-estimate/find-by-order-id/${orderId}`, null, true).pipe(
      map(res => this.#priceEstimateMapper.mapTo(res as PriceEstimateDto))
    )
  }
  findAll(): Observable<PriceEstimateModel[]> {
    throw new Error("Method not implemented.");
  }
  filterAll(filter: PriceEstimateModel): Observable<PriceEstimateModel[]> {
    throw new Error("Method not implemented.");
  }
  searchByKey(key: string): Observable<PriceEstimateModel[]> {
    throw new Error("Method not implemented.");
  }
  read(id: number): Observable<PriceEstimateModel> {
    throw new Error("Method not implemented.");
  }
  create(body: PriceEstimateModel): Observable<PriceEstimateModel> {
    return this.post(`price-estimate/${EndpointsEnum.create}`, this.#priceEstimateMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#priceEstimateMapper.mapTo(res as PriceEstimateDto)
      })
    );
  }
  update(body: PriceEstimateModel): Observable<PriceEstimateModel> {
    return this.post(`price-estimate/${EndpointsEnum.update}`, this.#priceEstimateMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#priceEstimateMapper.mapTo(res as PriceEstimateDto)
      })
    );
  }
  deleteById(id: number): Observable<null> {
    throw new Error("Method not implemented.");
  }

}
