import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    GoodsDeliveryGateway,
    GoodsDeliveryModel
} from '@domain/lib/purchase-and-orders';
import { AttachmentModel } from '@domain/lib/document-management';
import { EndpointsEnum, ReportExportTypeEnum } from '@view/lib/data-types';
import { EMPTY, map, Observable } from 'rxjs';
import { AttachmentDto, GoodsDeliveryDto } from '../../dto';
import { AttachmentMapper, GoodsDeliveryMapper } from '../../mapper';
import { BaseService } from '../../misc';

@Injectable({
  providedIn: 'root'
})
export class GoodsDeliveryImplementationService extends BaseService<GoodsDeliveryDto> implements GoodsDeliveryGateway {
  readonly #goodsDeliveryMapper = new GoodsDeliveryMapper();
  readonly #attachmentMapper = new AttachmentMapper();

  constructor() {
    super();
  }

  findAll(): Observable<GoodsDeliveryModel[]> {
    return this.getAll(`deliveries/${EndpointsEnum.findAll}`).pipe(
      map(res => res.map(each => this.#goodsDeliveryMapper.mapTo(each)))
    );
  }

  filterAll(filters: GoodsDeliveryModel): Observable<GoodsDeliveryModel[]> {
    const httpParams = new HttpParams().set('page', filters.pageNumber || 0).set('size', filters.pageSize || 10);
    return this.post(`deliveries/${EndpointsEnum.filterAll}`, this.#goodsDeliveryMapper.mapFrom(filters), {params: httpParams}).pipe(
      map(res => (res as GoodsDeliveryDto[])?.map(this.#goodsDeliveryMapper.mapTo))
    );
  }

  read(id: number): Observable<GoodsDeliveryModel> {
    return this.get(`deliveries/${EndpointsEnum.getById}/${id}`, null, true).pipe(
      map(this.#goodsDeliveryMapper.mapTo)
    );
  }


  create(body: GoodsDeliveryModel): Observable<GoodsDeliveryModel> {
    return this.post(`deliveries/${EndpointsEnum.create}`, this.#goodsDeliveryMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#goodsDeliveryMapper.mapTo(res as GoodsDeliveryDto)
      })
    );
  }

  update(body: GoodsDeliveryModel): Observable<GoodsDeliveryModel> {
    return this.put(`deliveries/${EndpointsEnum.update}/${body.id}`, this.#goodsDeliveryMapper.mapFrom(body), null, true).pipe(
      map(res => {
        return this.#goodsDeliveryMapper.mapTo(res as GoodsDeliveryDto)
      })
    );
  }

  deleteById(id: number): Observable<null> {
    return this.delete(`deliveries/${EndpointsEnum.delete}/${id}`);
  }

  searchByKey(key: string): Observable<GoodsDeliveryModel[]> {
    return EMPTY;
  }

  updateDeliveryState(params: GoodsDeliveryModel): Observable<GoodsDeliveryModel> {
    return this.put(`deliveries/change-stage/${params.id}/${params.nextState}`, this.#goodsDeliveryMapper.mapFrom(params)).pipe(
      map(res => {
        return this.#goodsDeliveryMapper.mapTo(res as GoodsDeliveryModel)
      })
    );
  }

  exportExcel(filters: GoodsDeliveryModel): Observable<AttachmentModel> {
    return this.post(`deliveries/export-file-delivery/${ReportExportTypeEnum.XLSX}`, this.#goodsDeliveryMapper.mapFrom(filters)).pipe(
      map(res => this.#attachmentMapper.mapTo(res as AttachmentDto))
    );
  }

  exportSerialNumbersExcel(filters: GoodsDeliveryModel): Observable<AttachmentModel> {
    return this.post(`deliveries/export-file-delivery-serial/${ReportExportTypeEnum.XLSX}`, this.#goodsDeliveryMapper.mapFrom(filters)).pipe(
      map(res => this.#attachmentMapper.mapTo(res as AttachmentDto))
    );
  }

}
