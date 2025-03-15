import { ClFile } from '@sadad/component-lib/src/models';
import { AttachRelatedEntityType } from '../enum/attachmentRelatedEntity.enum';

export interface AttachmentModel extends ClFile {
  entityId?: number;
  relatedEntity?: AttachRelatedEntityType;
}
