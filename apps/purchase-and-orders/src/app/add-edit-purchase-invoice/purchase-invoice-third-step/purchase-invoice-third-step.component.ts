import { Component, inject } from '@angular/core';
import { PurchaseInvoiceItemModel, PurchaseInvoiceModel } from '@domain/lib/purchase-and-orders';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { PurchaseInvoiceFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { CommonModules } from '@view/lib/values';
import { PurchaseInvoiceItemListComponent } from "../../purchase-invoice-item-list/purchase-invoice-item-list.component";

@Component({
  selector: 'purchase-purchase-invoice-third-step',
  standalone: true,
  imports: [CommonModules, HeadingComponent, ClDividerComponent, PurchaseInvoiceItemListComponent],
  templateUrl: './purchase-invoice-third-step.component.html',
  styleUrl: './purchase-invoice-third-step.component.scss',
})
export class PurchaseInvoiceThirdStepComponent extends BaseComponent<PurchaseInvoiceModel> {
  readonly purchaseInvoiceFacade = inject(PurchaseInvoiceFacade);
  invoice: any = this.purchaseInvoiceFacade.purchaseInvoiceStore.state$().selectedPurchaseInvoice$();
  constructor() {
    super();
    this.invoice.datePersian = formatDate(this.invoice.date || new Date, 'YYYY/MM/DD');
  }

  get filterValidItems(): PurchaseInvoiceItemModel[] {
    return this.invoice?.invoiceDetail?.invoiceItemList.filter((item: any) => !item.isDeleted);
  }
}
