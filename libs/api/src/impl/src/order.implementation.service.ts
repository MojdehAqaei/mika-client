import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderGateway, OrderModel, OrderStateEnum } from '@domain/lib/purchase-and-orders';
import { EndpointsEnum } from '@view/lib/data-types';
import { SelectItem } from '@view/lib/models';
import { map, Observable } from 'rxjs';
import { OrderDto } from '../../dto';
import { OrderMapper, OrderSelectItemMapper } from '../../mapper';
import { BaseService } from '../../misc';

@Injectable({
  providedIn: 'root'
})

export class OrderImplementationService extends BaseService<OrderDto> implements OrderGateway {
  readonly #orderMapper = new OrderMapper();
  readonly #orderItemMapper = new OrderSelectItemMapper();

  constructor() {
    super();
  }

  filterAll(filter: OrderModel): Observable<OrderModel[]> {
    const httpParams = new HttpParams().set('page', filter.pageNumber || 0).set('size', filter.pageSize || 10);
    return this.post(`orders/${EndpointsEnum.filterAll}`, this.#orderMapper.mapFrom(filter), { params: httpParams }).pipe(
      map(res => (res as OrderDto[])?.map(each => this.#orderMapper.mapTo(each)))
    )
  }

  getOrderListByState(state: OrderStateEnum): Observable<SelectItem<OrderModel>[]> {
    const params = new HttpParams().set('filter', '');
    return this.getAll(`orders/search-by-stage/${state}`, { params }, true)
      .pipe(
        map(res => res.map(each => ({
          label: String(each.documentNumber),
          value: this.#orderItemMapper.mapTo(each)
        }))),
      );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`orders/${EndpointsEnum.delete}/${id}`)
  }

  searchByKey(key: string): Observable<OrderModel[]> {
    throw new Error('Method not implemented.');
  }

  findAll(): Observable<OrderModel[]> {
    throw new Error('Method not implemented.');
  }

  read(id: number): Observable<OrderModel> {
    throw new Error('Method not implemented.');
  }

  create(t: OrderModel): Observable<OrderModel> {
    return this.post(`orders/${EndpointsEnum.create}`, this.#orderMapper.mapFrom(t), null, true).pipe(
      map(res => {
        return this.#orderMapper.mapTo(res as OrderDto)
      })
    );
  }

  update(t: OrderModel): Observable<OrderModel> {
    return this.put(`orders/${EndpointsEnum.update}/${t.id}`, this.#orderMapper.mapFrom(t), null, true).pipe(
      map(res => {
        return this.#orderMapper.mapTo(res as OrderDto)
      }
      ));
  }

  updateOrderState(params: OrderModel): Observable<OrderModel> {
    return this.put(`orders/change-stage/${params.id}/${params.nextState}`, {}).pipe(
      map(res => {
        return this.#orderMapper.mapTo(res as OrderModel)
      })
    );
  }
}
