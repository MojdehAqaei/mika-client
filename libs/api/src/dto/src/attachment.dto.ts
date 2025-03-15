export interface AttachmentDto {
  id?: number;
  attachmentId?: string;
  fileOriginalName?: string;
  oldFileName?: string;
  documentNumber?: bigint;
  documentDate?: Date;
  extension?: string;
  base64?: string;
  type?: unknown; // will be overridden in each entity
}
