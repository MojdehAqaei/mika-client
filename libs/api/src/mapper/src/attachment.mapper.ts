import { AttachmentModel, AttachRelatedEntityType } from '@domain/lib/document-management';
import { AttachmentDto } from '../../dto';
import { Mapper } from '../../misc';

export class AttachmentMapper implements Mapper<AttachmentModel, AttachmentDto> {
  mapFrom(param: AttachmentModel): AttachmentDto {
    return {
      id: param.entityId,
      attachmentId: param.id,
      base64: param.base64File,
      fileOriginalName: param.name,
      type: param.relatedEntity
    };
  }

  mapTo(param: AttachmentDto): AttachmentModel {
    const fileName = param.fileOriginalName || param.oldFileName;
    return {
      id: param.attachmentId,
      entityId: param.id,
      base64File: param.base64,
      name: param.extension ? `${fileName}.${param.extension}` : fileName,
      relatedEntity: param.type as AttachRelatedEntityType
    };
  }

}
