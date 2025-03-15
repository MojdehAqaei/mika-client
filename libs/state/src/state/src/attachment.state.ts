import { signal, WritableSignal } from '@angular/core';
import { AttachmentModel } from '@domain/lib/document-management';

export interface AttachmentState {
  readonly files$: WritableSignal<AttachmentModel[]>,
  readonly selectedFile$: WritableSignal<AttachmentModel>
}

export const attachmentInitialState: AttachmentState = {
  files$: signal<AttachmentModel[]>([]),
  selectedFile$: signal<AttachmentModel>({}),
}
