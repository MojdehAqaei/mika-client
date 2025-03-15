import { Injectable } from '@angular/core';
import { AttachmentGateway, attachmentListModel, AttachmentModel } from '@domain/lib/document-management';
import { map, Observable } from 'rxjs';
import { AttachmentDto, } from '../../dto';
import { AttachmentMapper } from '../../mapper';
import { BaseService } from "../../misc";

@Injectable({
  providedIn: 'root'
})
export class AttachmentImplementationService extends BaseService<AttachmentDto> implements AttachmentGateway {
  readonly #attachmentMapper = new AttachmentMapper();

  constructor() {
    super();
  }

  getAllFiles(attachmentList: attachmentListModel): Observable<AttachmentModel[]> {
    // @ts-ignore
    return this.post(`file-manager/getAllFile`, attachmentList).pipe(
      map(res => (res as AttachmentDto[]).map(each => this.#attachmentMapper.mapTo(each))),
    );
  }

  getFileByAttachmentId(attachment: AttachmentModel): Observable<AttachmentModel> {
    return this.get(`file-manager/get/${attachment.id}/${attachment.relatedEntity}`).pipe(
      map(res => this.#attachmentMapper.mapTo(res as AttachmentDto))
    );
  }


}
