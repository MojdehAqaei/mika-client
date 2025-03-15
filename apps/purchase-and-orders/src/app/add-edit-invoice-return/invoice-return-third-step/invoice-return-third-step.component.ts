import { Component, inject } from '@angular/core';
import { InvoiceReturnItemModel, InvoiceReturnModel } from '@domain/lib/purchase-and-orders';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { InvoiceReturnFacade } from '@state/lib/facade';
import { BaseComponent, HeadingComponent } from '@view/lib/components';
import { CommonModules } from '@view/lib/values';
import { InvoiceReturnItemListComponent } from '../../invoice-return-item-list/invoice-return-item-list.component';

@Component({
  selector: 'purchase-invoice-return-third-step',
  standalone: true,
  imports: [CommonModules, HeadingComponent, ClDividerComponent, InvoiceReturnItemListComponent],
  templateUrl: './invoice-return-third-step.component.html',
})
export class InvoiceReturnThirdStepComponent extends BaseComponent<InvoiceReturnModel> {
  readonly invoiceReturnFacade = inject(InvoiceReturnFacade);
  invoice: any = this.invoiceReturnFacade.invoiceReturnStore.state$().selectedInvoiceReturn$();
  constructor() {
    super();
    this.invoice.datePersian = formatDate(this.invoice.date || new Date, 'YYYY/MM/DD');
  }

  get filterValidItems(): InvoiceReturnItemModel[] {
    return this.invoice?.invoiceDetail?.invoiceItemList.filter((item: any) => !item.isDeleted);
  }
}
