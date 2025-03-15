import { Injectable } from '@angular/core';
import { map, NEVER, Observable } from 'rxjs';
import { BaseService } from '../../misc';
import { AttachmentMapper, TransferAndReceiptMapper } from '../../mapper';
import { AttachmentDto, TransferAndReceiptDto } from '../../dto';
import { TransferAndReceiptGateway, TransferAndReceiptModel } from '@domain/lib/stockroom';
import { HttpParams } from '@angular/common/http';
import { EndpointsEnum, ReportExportTypeEnum } from '@view/lib/data-types';
import { AttachmentModel } from '@domain/lib/document-management';


@Injectable({
  providedIn: 'root'
})

export class TransferAndReceiptImplementationService extends BaseService<TransferAndReceiptDto> implements TransferAndReceiptGateway {
  readonly #transferAndReceiptMapper = new TransferAndReceiptMapper();
  readonly #attachmentMapper = new AttachmentMapper();

  constructor() {
    super();
  }

  filterAll(filter: TransferAndReceiptModel): Observable<TransferAndReceiptModel[]> {
    const params = new HttpParams().set('page', filter.pageNumber || 0).set('size', filter.pageSize || 10);
    return this.post(`inventory-documents/${EndpointsEnum.filterAll}`, this.#transferAndReceiptMapper.mapFrom(filter), { params }).pipe(
      map(res => (res as TransferAndReceiptDto[])?.map(each => this.#transferAndReceiptMapper.mapTo(each)))
    )
  }

  exportExcel(filters: TransferAndReceiptModel): Observable<AttachmentModel> {
    return this.post(`inventory-documents/export-file-inventory-excel/${ReportExportTypeEnum.XLSX}`, this.#transferAndReceiptMapper.mapFrom(filters)).pipe(
      map(res => this.#attachmentMapper.mapTo(res as AttachmentDto))
    );
  }

  exportTransferAndReceiptItemPdf(itemId: number): Observable<AttachmentModel> {
    return this.get(`inventory-documents/export-file-inventory/${ReportExportTypeEnum.PDF}/${itemId}`).pipe(
      map(res => this.#attachmentMapper.mapTo(res as AttachmentDto))
    );
  }

  create(t: TransferAndReceiptModel): Observable<TransferAndReceiptModel> {
    return NEVER;
  }

  deleteById(id: number): Observable<null> {
    return NEVER;
  }

  findAll(): Observable<TransferAndReceiptModel[]> {
    return NEVER;
  }

  read(id: number): Observable<TransferAndReceiptModel> {
    return NEVER;
  }

  searchByKey(key: string): Observable<TransferAndReceiptModel[]> {
    return NEVER;
  }

  update(t: TransferAndReceiptModel): Observable<TransferAndReceiptModel> {
    return NEVER;
  }

  updateState(params: TransferAndReceiptModel): Observable<TransferAndReceiptModel> {
    return NEVER;
  }

}
