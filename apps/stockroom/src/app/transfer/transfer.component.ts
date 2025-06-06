import { Component, computed, effect, Inject, inject, OnInit, untracked, ViewEncapsulation } from '@angular/core';
import { CommonModules, CONFIRMATION_SERVICE_CONFIG } from '@view/lib/values';
import { BaseComponent, CrudComponent } from '@view/lib/components';
import {
  getTransfersAndReceiptsUseCaseProvider,
  changeTransferAndReceiptStateUseCaseProvider,
  TransferAndReceiptGateway,
  TransferAndReceiptModel,
  transferAndReceiptStateDataMapper,
  TransferAndReceiptStateEnum,
  exportTransferAndReceiptListExcelFileUseCaseProvider,
  exportTransferAndReceiptItemPdfFileUseCaseProvider
} from '@domain/lib/stockroom';
import { TransferAndReceiptImplementationService } from '@api/lib/impl';
import { TransferFacade } from '@state/lib/facade';
import { ClColumn, ClColumnDataType, ClConfirmation } from '@sadad/component-lib/src/models';
import { DataTableAction } from '@view/lib/models';
import { cacheClear } from '@sadad/component-lib/src/decorators';
import { TransferAndReceiptItemListComponent } from '../transfer-and-receipt-item-list/transfer-and-receipt-item-list.component';
import { TransferAndReceiptPreviewComponent } from '../transfer-and-receipt-preview/transfer-and-receipt-preview.component';
import { ClConfirmationService } from '@sadad/component-lib/src/services';



@Component({
  selector: 'stockroom-transfer',
  standalone: true,
  imports: [CommonModules, CrudComponent, TransferAndReceiptItemListComponent, TransferAndReceiptPreviewComponent],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: TransferAndReceiptGateway, useClass: TransferAndReceiptImplementationService},
    TransferFacade,
    getTransfersAndReceiptsUseCaseProvider,
    changeTransferAndReceiptStateUseCaseProvider,
    exportTransferAndReceiptListExcelFileUseCaseProvider,
    exportTransferAndReceiptItemPdfFileUseCaseProvider
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss',
})
export class TransferComponent extends BaseComponent<TransferAndReceiptModel> implements OnInit {
  readonly transferFacade = inject(TransferFacade);
  readonly #confirmationService = inject(ClConfirmationService);

  cols!: ClColumn[];
  actions?: DataTableAction[];

  constructor(@Inject(CONFIRMATION_SERVICE_CONFIG) public confirmationConfig: ClConfirmation) {
    super();

    effect(() => {
      const activeFiscalPeriod = this.appFacade.appStore.state$().activeFiscalPeriod$();
      untracked(() => {
        if (activeFiscalPeriod?.id) {
          cacheClear['updateTransferList'].clear();
          this.transferFacade.updateTransferList({});
        }
      });
    });
  }

  ngOnInit() {
    this.first$ = computed(() => this.transferFacade.transferStore.state$().pageNumber$() * this.transferFacade.transferStore.state$().pageSize$());
    this.showPaginator$ = computed(() => this.transferFacade.transferStore.state$().total$() > this.transferFacade.transferStore.state$().pageSize$());
    this.transferFacade.updateAllowedActions(this.appFacade.appStore.state$().loggedInUser$()?.permissions?.find(p => p.data.name == this.permissionKey)?.data?.value || []);

    this.cols = [
      {
        colSpan: 1,
        value: ['autoGeneratedCode'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.transfer.code')
      },
      {
        colSpan: 1,
        value: ['datePersian'],
        type: ClColumnDataType.TEXT,
        header: this.translate.instant('stockroom.transfer.date')
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
          { key: "state", value: TransferAndReceiptStateEnum.AUTOMATED_INITIAL_SUBMIT, styleClass: "transfer-state automated_initial_submit"},
          { key: "state", value: TransferAndReceiptStateEnum.WAITING_FOR_CURRENCY_CONVERSION, styleClass: "transfer-state waiting_for_currency_conversion"},
          { key: "state", value: TransferAndReceiptStateEnum.WAITING_FOR_DOCUMENT_ISSUANCE, styleClass: "transfer-state waiting_for_document_issuance"},
          { key: "state", value: TransferAndReceiptStateEnum.CANCELED, styleClass: "transfer-state canceled"},
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
          this.transferFacade.updateSelectedTransfer(event.row);
          this.transferFacade.toggleDialogVisibility(true);
        },
        key: 'Read'
      },
      {
        label: this.translate.instant('export.pdf'),
        icon: 'picture_as_pdf',
        index: 1,
        styleClasses: 'red-text text-darken-2',
        command: (event) => this.transferFacade.exportTransferItemPdf(event.row.id),
        key: 'ExportPDF'
      },
      /*{
        label: this.translate.instant('finalize-submit'),
        icon: 'send',
        index: 1,
        styleClasses: 'amber-text text-darken-2',
        status: {
          status: false,
          on: [
            { rowField: 'state', rowValue: [TransferAndReceiptStateEnum.AUTOMATED_INITIAL_SUBMIT] }
          ]
        },
        command: (event) => this.confirmTransferStateChange(event, undefined),
        key: 'Finalize'
      }*/
    ];
  }

  confirmTransferStateChange(event: { action: DataTableAction, row: TransferAndReceiptModel }, nextState: TransferAndReceiptStateEnum) {
    this.#confirmationService.confirm(this.viewRef, {
      ...this.confirmationConfig,
      message: this.translate.instant('messages.sure-to-change-state', {value: this.translate.instant('stockroom.transfer.')}),
      accept: () => this.transferFacade.updateTransferState({ ...event.row, nextState: nextState }),
    });
  }

  dismiss() {
    this.transferFacade.toggleDialogVisibility(false);
  }

  downloadExcel(event: TransferAndReceiptModel) {
    this.transferFacade.exportTransferListExcelFile(event || {});
  }

  filterReceipts(event: TransferAndReceiptModel) {
    cacheClear['updateTransferList'].clear();
    this.transferFacade.updatePage(this.transferFacade.transferStore.state$().pageSize$(), 0);
    this.transferFacade.updateTransferList({
      ...event,
      pageNumber: this.transferFacade.transferStore.state$().pageNumber$(),
      pageSize: this.transferFacade.transferStore.state$().pageSize$()
    });
  }

  clearFilters() {
    cacheClear['updateTransferList'].clear();
    // this.formGroup?.markAsUntouched();
  }

  page(event: { rows: number, first: number, page: number } & TransferAndReceiptModel) {
    cacheClear['updateTransferList'].clear();
    this.transferFacade.updatePage(event.rows, event.page - 1);
    this.transferFacade.updateTransferList(
      {
        ...event,
        pageNumber: this.transferFacade.transferStore.state$().pageNumber$(),
        pageSize: this.transferFacade.transferStore.state$().pageSize$()
      });
  }
}
