import { Component, computed, effect, Inject, inject, OnInit, untracked, ViewEncapsulation } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import {
  changeTransferAndReceiptStateUseCaseProvider,
  getTransfersAndReceiptsUseCaseProvider,
  TransferAndReceiptGateway,
  TransferAndReceiptModel,
  transferAndReceiptStateDataMapper,
  TransferAndReceiptStateEnum,
  exportTransferAndReceiptListExcelFileUseCaseProvider,
  exportTransferAndReceiptItemPdfFileUseCaseProvider
} from '@domain/lib/stockroom';
import { ReceiptFacade } from '@state/lib/facade';
import { TransferAndReceiptImplementationService } from '@api/lib/impl';
import { ClColumn, ClColumnDataType, ClConfirmation } from '@sadad/component-lib/src/models';
import { DataTableAction } from '@view/lib/models';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { TransferAndReceiptItemListComponent } from '../transfer-and-receipt-item-list/transfer-and-receipt-item-list.component';
import { TransferAndReceiptPreviewComponent } from '../transfer-and-receipt-preview/transfer-and-receipt-preview.component';
import { ClConfirmationService } from '@sadad/component-lib/src/services';

@Component({
  selector: 'stockroom-receipt',
  standalone: true,
  imports: [CommonModules, CrudComponent, TransferAndReceiptItemListComponent, TransferAndReceiptPreviewComponent],
  providers: [
    { provide: TransferAndReceiptGateway, useClass: TransferAndReceiptImplementationService},
    ReceiptFacade,
    getTransfersAndReceiptsUseCaseProvider,
    changeTransferAndReceiptStateUseCaseProvider,
    exportTransferAndReceiptListExcelFileUseCaseProvider,
    exportTransferAndReceiptItemPdfFileUseCaseProvider
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss',
})
export class ReceiptComponent extends BaseComponent<TransferAndReceiptModel> implements OnInit {
  readonly receiptFacade = inject(ReceiptFacade);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    effect(() => {
      const activeFiscalPeriod = this.appFacade.appStore.state$().activeFiscalPeriod$();
      untracked(() => {
        if (activeFiscalPeriod?.id) {
          cacheClear['updateReceiptList'].clear();
          this.receiptFacade.updateReceiptList({});
        }
      });
    });
  }

  ngOnInit() {
    this.first$ = computed(() => this.receiptFacade.receiptStore.state$().pageNumber$() * this.receiptFacade.receiptStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.receiptFacade.receiptStore.state$().total$() > this.receiptFacade.receiptStore.state$().pageSize$());
    this.receiptFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols = [
      {
        colSpan: 1,
        value: ['autoGeneratedCode'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.receipt.code')
      },
      {
        colSpan: 1,
        value: ['datePersian'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.receipt.date')
      },
      {
        colSpan: 1,
        value: ['stockroomTitle'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.')
      },
      {
        colSpan: 1,
        value: ['typeLabel'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.document.')
      },
      {
        colSpan: 1,
        value: ['state'],
        valueMapper: [transferAndReceiptStateDataMapper],
        cellConfig: [
          { key: "state", value: TransferAndReceiptStateEnum.AUTOMATED_INITIAL_SUBMIT, styleClass: "receipt-state automated_initial_submit"},
          { key: "state", value: TransferAndReceiptStateEnum.WAITING_FOR_CURRENCY_CONVERSION, styleClass: "receipt-state waiting_for_currency_conversion"},
          { key: "state", value: TransferAndReceiptStateEnum.WAITING_FOR_DOCUMENT_ISSUANCE, styleClass: "receipt-state waiting_for_document_issuance"},
          { key: "state", value: TransferAndReceiptStateEnum.CANCELED, styleClass: "receipt-state canceled"},
        ],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('status')
      }
    ];

    this.actions = [
      {
        label: this.translate.instant('preview'),
        icon: 'preview',
        index: 0,
        styleClasses: 'blue-text text-darken-2',
        command: (event) => {
          this.receiptFacade.updateSelectedReceipt(event.row);
          this.receiptFacade.toggleDialogVisibility(true);
        },
        key: 'Read'
      },
      {
        label: this.translate.instant('export.pdf'),
        icon: 'picture_as_pdf',
        index: 1,
        styleClasses: 'red-text text-darken-2',
        command: (event) => this.receiptFacade.exportReceiptItemPdf(event.row.id),
        key: 'ExportPDF'
      },
      /*{
        label: this.translate.instant('finalize-submit'),
        icon: 'send',
        index: 0,
        styleClasses: 'amber-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [TransferAndReceiptStateEnum.AUTOMATED_INITIAL_SUBMIT] }
          ]
        },
        command: (event) => this.confirmReceiptStateChange(event, undefined),
        key: 'Finalize'
      }*/
    ];
  }

  confirmReceiptStateChange(event: { action: DataTableAction, row: TransferAndReceiptModel }, nextState: TransferAndReceiptStateEnum) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.sure-to-change-state', {value: this.translate.instant('stockroom.receipt.')}),
      accept: () => this.receiptFacade.updateReceiptState({ ...event.row, nextState: nextState }),
    });
  }

  dismiss() {
    this.receiptFacade.toggleDialogVisibility(false);
  }

  downloadExcel(event: TransferAndReceiptModel) {
    this.receiptFacade.exportReceiptListExcelFile(event || {});
  }

  filterReceipts(event: TransferAndReceiptModel) {
    cacheClear['updateReceiptList'].clear();
    this.receiptFacade.updatePage(this.receiptFacade.receiptStore.state$().pageSize$(), 0);
    this.receiptFacade.updateReceiptList({
      ...event,
      pageNumber: this.receiptFacade.receiptStore.state$().pageNumber$(),
      pageSize: this.receiptFacade.receiptStore.state$().pageSize$()
    });
  }

  clearFilters() {
    cacheClear['updateReceiptList'].clear();
    // this.formGroup?.markAsUntouched();
  }

  page(event: { rows: number, first: number, page: number } & TransferAndReceiptModel) {
    cacheClear['updateReceiptList'].clear();
    this.receiptFacade.updatePage(event.rows, event.page - 1);
    this.receiptFacade.updateReceiptList(
      {
        ...event,
        pageNumber: this.receiptFacade.receiptStore.state$().pageNumber$(),
        pageSize: this.receiptFacade.receiptStore.state$().pageSize$()
      });
  }
}
