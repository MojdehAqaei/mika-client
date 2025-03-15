import { inject, Injectable } from '@angular/core';
import { attachmentListModel, AttachmentModel, GetAllFilesUseCase, GetFileUseCase } from '@domain/lib/document-management';
import { ClGenerateFileService } from '@sadad/component-lib/src/services';
import { AttachmentStore } from '../../store';



@Injectable()
export class AttachmentFacade {
  public attachmentStore = inject(AttachmentStore);

  readonly #generateFileService = inject(ClGenerateFileService);

  readonly #getFileUseCase = inject(GetFileUseCase);
  readonly #getAllFilesUseCase = inject(GetAllFilesUseCase);

  downloadFileById(attachment: AttachmentModel) {
    this.#getFileUseCase.execute(attachment).subscribe(res => {
      this.attachmentStore.updateSelectedFile(res);
      this.#generateFileService.generateDownloadableFile({ ...res, name: attachment.name });
    });
  }

  downloadAllFiles(attachmentList: attachmentListModel) {
    this.#getAllFilesUseCase.execute(attachmentList).subscribe(res => {
      this.attachmentStore.updateFilesList(res);
    });
  }

}
