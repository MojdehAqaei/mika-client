import { Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import { HttpContext, HttpParams } from '@angular/common/http';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import {
  ORDER_TYPE,
  OrderModel,
  orderTypeOptions,
  SUPPLY_METHOD,
  supplyMethodOptions
} from '@domain/lib/purchase-and-orders';
import { ClAction, ClConfirmation, ClSelectItem } from '@sadad/component-lib/src/models';
import { ClDatePickerComponent } from '@sadad/component-lib/src/lib/date-picker';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { OrderForm } from '../../../forms/order.form';
import { ClFileDownloaderComponent } from '@sadad/component-lib/src/lib/file-downloader';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ClFileUploadComponent } from '@sadad/component-lib/src/lib/file-uploader';
import { AttachmentModel } from '@domain/lib/document-management';
import { AttachmentFacade } from '@state/lib/facade';

@Component({
  selector: 'purchase-order-initial-step',
  standalone: true,
  imports: [CommonModules, HeadingComponent, ClDatePickerComponent, ClFileDownloaderComponent, ClFileUploadComponent],
  providers: [
    {provide: ORDER_TYPE, useValue: orderTypeOptions},
    {provide: SUPPLY_METHOD, useValue: supplyMethodOptions},
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './order-initial-step.component.html',
  styles: `
  .order-attachments cl-file-uploader .cl-file-uploader-buttonbar cl-button:nth-of-type(2) { display: none }`
})
export class OrderInitialStepComponent extends BaseComponent<OrderModel> {
  readonly attachmentFacade = inject(AttachmentFacade);
  readonly #parentFormGroup = inject(FormGroupDirective);

  httpContext = new HttpContext().set(SKIP_LOADING, true);
  deletingAttachmentId!: string;

  constructor(@Inject(ORDER_TYPE) public orderTypeOptions: ClSelectItem[],
              @Inject(SUPPLY_METHOD) public supplyMethodOptions: ClSelectItem[],
              @Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation
              ) {
    super();
    this.formGroup = this.#parentFormGroup.control.get("initialStep") as FormGroup<OrderForm>;
  }



  deleteAttachment(event: {action: ClAction, row: AttachmentModel}) {
    this.deletingAttachmentId = event.row.id ?? '';
    if (event.action.key == 'download') {
      this.attachmentFacade.downloadFileById(event.row);
    }
  }

  deleteFileHttpParams() {
    return new HttpParams().set('attachmentId', this.deletingAttachmentId);
  }
}
