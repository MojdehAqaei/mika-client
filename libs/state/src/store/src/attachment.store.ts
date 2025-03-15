import { Signal } from '@angular/core';
import { AttachmentModel } from '@domain/lib/document-management';
import { attachmentInitialState, AttachmentState } from '../../state';
import { Store } from '../store';


export class AttachmentStore {
  #store = new Store<AttachmentState>(attachmentInitialState);
  public readonly state$: Signal<AttachmentState> = this.#store.state$.asReadonly();

  updateFilesList(files: AttachmentModel[]) {
    this.#store.updateField('files$', files);
  }

  updateSelectedFile(file: AttachmentModel) {
    this.#store.updateField('selectedFile$', file);
  }

}
