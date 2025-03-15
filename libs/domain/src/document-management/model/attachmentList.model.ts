import { AttachRelatedEntityType } from "../enum/attachmentRelatedEntity.enum";

export interface attachmentListModel {
  list: string[],
  fileTypeEnum: AttachRelatedEntityType
}
