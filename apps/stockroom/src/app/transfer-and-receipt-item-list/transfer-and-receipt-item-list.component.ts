import { Component, input, InputSignal, OnInit } from '@angular/core';
import { CommonModules } from '@view/lib/values';
import { BaseComponent } from '@view/lib/components';
import { TransferAndReceiptItemModel } from '@domain/lib/stockroom';
import { ClDataTableComponent } from '@sadad/component-lib/src/lib/data-table';
import { ClColumn, ClColumnDataType } from '@sadad/component-lib/src/models';

@Component({
  selector: 'stockroom-transfer-and-receipt-item-list',
  standalone: true,
  imports: [CommonModules, ClDataTableComponent],
  templateUrl: './transfer-and-receipt-item-list.component.html',
  styles: `
  .transfer-and-receipt-item-wrapper {
    background-color: #f0f7ff;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 15px 10px;
    .transfer-and-receipt-item-inner {
      width: calc((100% / 6) - 10px);
      text-align: right;
      margin-right: 10px;
      text-overflow: ellipsis;
    }
  }`
})
export class TransferAndReceiptItemListComponent extends BaseComponent<TransferAndReceiptItemModel> implements OnInit {

  items: InputSignal<TransferAndReceiptItemModel[]> = input<TransferAndReceiptItemModel[]>([]);
  view: InputSignal<'table' | 'simple'> = input<'table' | 'simple'>('table');

  cols: ClColumn[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.cols = [
      {
        colSpan: 1,
        value: ['goodsCode'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.code')
      },
      {
        colSpan: 1,
        value: ['goodsLabel'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.goods.')
      },
      {
        colSpan: 1,
        value: ['countingUnitTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('base-data.counting-unit.type')
      },
      {
        colSpan: 1,
        value: ['quantity'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('quantity') + ' / ' + this.translate.instant('value')
      },
      {
        colSpan: 1,
        value: ['description'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('description')
      }
    ];
  }
}
