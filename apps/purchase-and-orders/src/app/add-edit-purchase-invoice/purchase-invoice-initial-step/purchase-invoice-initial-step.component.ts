import { HttpContext, HttpParams } from '@angular/common/http';
import { Component, effect, Inject, inject, untracked, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { AttachmentModel } from '@domain/lib/document-management';
import { ORDER_TYPE, OrderModel, OrderStateEnum, orderTypeOptions, PURCHASE_INVOICE_TYPE, PurchaseInvoiceModel, purchaseInvoiceTypeOptions } from '@domain/lib/purchase-and-orders';
import { SKIP_LOADING } from '@sadad/component-lib/src/interceptors';
import { ClDatePickerComponent } from '@sadad/component-lib/src/lib/date-picker';
import { ClFileUploadComponent } from '@sadad/component-lib/src/lib/file-uploader';
import { ClKeyFilterDirective } from '@sadad/component-lib/src/lib/key-filter';
import { ClAction, ClConfirmation, ClSelectItem } from '@sadad/component-lib/src/models';
import { AttachmentFacade, PurchaseInvoiceFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { PurchaseInvoiceForm } from '../../../forms/purchase-invoice.form';

@Component({
  selector: 'purchase-purchase-invoice-initial-step',
  standalone: true,
  imports: [CommonModules, ClDatePickerComponent, HeadingComponent, ClFileUploadComponent, ClKeyFilterDirective],
  providers: [
    { provide: PURCHASE_INVOICE_TYPE, useValue: purchaseInvoiceTypeOptions },
    { provide: ORDER_TYPE, useValue: orderTypeOptions },
  ],
  templateUrl: './purchase-invoice-initial-step.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
  .invoice-attachments cl-file-uploader .cl-file-uploader-buttonbar cl-button:nth-of-type(2) { display: none }`,
})
export class PurchaseInvoiceInitialStepComponent extends BaseComponent<PurchaseInvoiceModel> {

  readonly purchaseInvoiceFacade = inject(PurchaseInvoiceFacade);
  readonly #parentFormGroup = inject(FormGroupDirective);
  readonly purchaseInvoiceTypeOptions = inject<ClSelectItem[]>(PURCHASE_INVOICE_TYPE);
  readonly attachmentFacade = inject(AttachmentFacade);

  httpContext = new HttpContext().set(SKIP_LOADING, true);
  orderStateEnum = OrderStateEnum;
  deletingAttachmentId!: string;
  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();
    this.formGroup = this.#parentFormGroup.control.get("initialStep") as FormGroup<PurchaseInvoiceForm>;

    effect(() => {
      const edit = this.purchaseInvoiceFacade.purchaseInvoiceStore.state$().editMode$();
      const invoice = this.purchaseInvoiceFacade.purchaseInvoiceStore.state$().selectedPurchaseInvoice$();
      untracked(() => {
        if (edit && invoice) {
          const order = this.purchaseInvoiceFacade.purchaseInvoiceStore.state$().orderList$();
          const selectedOrder = order.find(item => {
            return item.value?.id === invoice.order?.value?.id
          });
          this.purchaseInvoiceFacade.updateOrderItemListPerOrderId(selectedOrder?.value?.orderSelectItems || []);
        }
      })
    })
  }

  setOrder(order: OrderModel) {
    this.purchaseInvoiceFacade.updateOrderItemListPerOrderId(order.orderSelectItems || []);
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

  setSellerLabel(event: any) {
    this.formGroup.get('sellerLabel')?.setValue(event['title'] || event['name']);
  }
}
