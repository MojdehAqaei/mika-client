import { Observable } from 'rxjs';
import { UseCase } from '../../use-case';
import { inject } from '@angular/core';
import { AttachmentModel } from '../model/attachment.model';
import { AttachmentGateway } from '../gateway/attachment.gateway';


export class GetFileUseCase implements UseCase<AttachmentModel, AttachmentModel> {
  readonly #attachmentGateway = inject(AttachmentGateway);

  execute(attachment: AttachmentModel): Observable<AttachmentModel> {
    return this.#attachmentGateway.getFileByAttachmentId(attachment);
  }
}
