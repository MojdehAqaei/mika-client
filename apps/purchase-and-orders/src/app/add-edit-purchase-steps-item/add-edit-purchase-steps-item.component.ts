import { HttpParams } from '@angular/common/http';
import { Component, effect, inject, untracked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttachmentModel } from '@domain/lib/document-management';
import { PurchaseStepsItemModel } from '@domain/lib/purchase-and-orders';
import { ClFileUploadComponent } from '@sadad/component-lib/src/lib/file-uploader';
import { ClAction, ClConfirmation, ClPanelAction } from '@sadad/component-lib/src/models';
import { AttachmentFacade, PurchaseStepsFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { ADD_BUTTON, CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { PurchaseStepsItemForm } from '../../forms/purchase-steps-item.form';
import { PurchaseStepsItemListComponent } from "../purchase-steps-item-list/purchase-steps-item-list.component";

@Component({
  selector: 'purchase-add-edit-purchase-steps-item',
  standalone: true,
  imports: [CommonModules, ClFileUploadComponent, HeadingComponent, PurchaseStepsItemListComponent],
  templateUrl: './add-edit-purchase-steps-item.component.html',
  styles: `
  .attachments cl-file-uploader .cl-file-uploader-buttonbar cl-button:nth-of-type(2) { display: none }`,
})
export class AddEditPurchaseStepsItemComponent extends BaseComponent<PurchaseStepsItemModel> {
  readonly purchaseStepsFacade = inject(PurchaseStepsFacade);
  readonly attachmentFacade = inject(AttachmentFacade);
  readonly confirmationConfig = inject<ClConfirmation>(CONFIRMATION_SERVICE_CONFIG);
  readonly addButton = inject<ClPanelAction>(ADD_BUTTON);

  deletingAttachmentId!: string;

  constructor() {
    super();

    this.formGroup = new FormGroup<PurchaseStepsItemForm>({
      id: new FormControl,
      description: new FormControl,
      attachedFiles: new FormControl,
      purchaseStepType: new FormControl(null, { validators: [Validators.required], nonNullable: true })
    });


    effect(() => {
      const selectedPurchaseSteps = this.purchaseStepsFacade.purchaseStepsStore.state$().selectedPurchaseSteps$().purchaseStepsItems;
      untracked(() => {
        this.purchaseStepsFacade.purchaseStepsStore.updateEditMode(!!selectedPurchaseSteps?.length);
      })
    });
  }

  removeItem(removedItem: PurchaseStepsItemModel): void {
    const index = this.purchaseStepsFacade.purchaseStepsStore.state$().selectedPurchaseSteps$().purchaseStepsItems?.findIndex(item => item?.id === removedItem?.id);
    if (index !== -1) {
      this.purchaseStepsFacade.deletedPurchaseStepsItem(removedItem.id!);
    }
  }

  deleteAttachment(event: { action: ClAction, row: AttachmentModel }) {
    this.deletingAttachmentId = event.row.id ?? '';
    if (event.action.key == 'download') {
      this.attachmentFacade.downloadFileById(event.row);
    }
  }

  deleteFileHttpParams() {
    return new HttpParams().set('attachmentId', this.deletingAttachmentId);
  }

  addStepToList() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup.valid) {
      const purchaseStepType = this.formGroup.value.purchaseStepType;

      const stepType = this.purchaseStepsFacade.purchaseStepsStore.state$().purchaseStepTypeList$().find(i => i.value == purchaseStepType);
      if (stepType) {
        const step: PurchaseStepsItemModel = {
          purchaseStepType: {
            id: stepType.value,
            title: stepType.label
          },
          description: this.formGroup.value.description,
          attachedFiles: this.formGroup.value.attachedFiles,
          purchaseStep: this.purchaseStepsFacade.purchaseStepsStore.state$().selectedPurchaseSteps$()
        };

        this.purchaseStepsFacade.savedPurchaseStepsItem(step);
        this.formGroup.reset();
      }
    }
  }

}
