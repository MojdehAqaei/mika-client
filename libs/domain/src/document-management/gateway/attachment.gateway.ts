import { Observable } from 'rxjs';
import { AttachmentModel } from '../model/attachment.model';
import { attachmentListModel } from '../model/attachmentList.model';

export abstract class AttachmentGateway {
  abstract getFileByAttachmentId(attachment: AttachmentModel): Observable<AttachmentModel>;
  abstract getAllFiles(attachmentList: attachmentListModel): Observable<AttachmentModel[]>;
}
