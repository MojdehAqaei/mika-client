import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { AttachmentGateway } from '../gateway/attachment.gateway';
import { AttachmentModel } from '../model/attachment.model';
import { attachmentListModel } from '../model/attachmentList.model';


export class GetAllFilesUseCase implements UseCase<attachmentListModel, AttachmentModel[]> {
  readonly #attachmentGateway = inject(AttachmentGateway);

  execute(attachmentList: attachmentListModel): Observable<AttachmentModel[]> {
    return this.#attachmentGateway.getAllFiles(attachmentList);
  }
}
