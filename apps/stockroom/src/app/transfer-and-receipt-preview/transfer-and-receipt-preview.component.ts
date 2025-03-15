import { Component, input, InputSignal } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { HeadingComponent } from '@view/lib/components';
import { ClDividerComponent } from '@sadad/component-lib/src/lib/divider';
import { TransferAndReceiptItemListComponent } from '../transfer-and-receipt-item-list/transfer-and-receipt-item-list.component';
import { TransferAndReceiptModel } from '@domain/lib/stockroom';

@Component({
  selector: 'stockroom-transfer-and-receipt-preview',
  standalone: true,
  imports: [CommonModules, ClDividerComponent, TransferAndReceiptItemListComponent, HeadingComponent],
  templateUrl: './transfer-and-receipt-preview.component.html',
})
export class TransferAndReceiptPreviewComponent {
  data: InputSignal<TransferAndReceiptModel> = input<TransferAndReceiptModel>({});
  type: InputSignal<'RECEIPT' | 'TRANSFER'> = input<'RECEIPT' | 'TRANSFER'>('TRANSFER');


  constructor() {
  }
}
