import { inject, Injectable } from '@angular/core';
import { Cache } from '@sadad/component-lib/src/decorators';
import {
  receiptFilterDataMapper,
  GetTransfersAndReceiptsUseCase,
  ChangeTransferAndReceiptStateUseCase,
  TransferAndReceiptModel,
  TransferAndReceiptModelFilter,
  TransferAndReceiptTypeEnum,
  ExportTransferAndReceiptListExcelFileUseCase,
  ExportTransferAndReceiptItemPdfFileUseCase
} from '@domain/lib/stockroom';
import { ReceiptStore } from '../../store';
import { Crud } from "@view/lib/data-types";
import { ClGenerateFileService } from '@sadad/component-lib/src/services';


@Injectable()
export class ReceiptFacade {
  public receiptStore = inject(ReceiptStore);

  readonly #generateFileService = inject(ClGenerateFileService);

  readonly #getReceiptsUseCase = inject(GetTransfersAndReceiptsUseCase);
  readonly #changeTransferAndReceiptStateUseCase = inject(ChangeTransferAndReceiptStateUseCase);
  readonly #exportTransferAndReceiptListExcelFileUseCase = inject(ExportTransferAndReceiptListExcelFileUseCase);
  readonly #exportTransferAndReceiptItemPdfFileUseCase = inject(ExportTransferAndReceiptItemPdfFileUseCase);


  constructor() {
    this.receiptStore.updatePageNumber(0);
  }

  updateSelectedReceipt(receipt: TransferAndReceiptModel) {
    this.receiptStore.updateSelectedReceipt(receipt);
  }

  toggleDialogVisibility(visible: boolean) {
    this.receiptStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.receiptStore.updatePageSize(pageSize);
    this.receiptStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.receiptStore.updateAllowedActions(actions);
  }

  @Cache()
  updateReceiptList(filters: TransferAndReceiptModel) {
    const flt: TransferAndReceiptModel = {
      ...filters,
      parentType: TransferAndReceiptTypeEnum.RECEIPT
    }
    this.#getReceiptsUseCase.execute(flt).subscribe(res => {
      this.receiptStore.updateReceiptsTable(res);
      res?.length && res[0].totalElements ? this.receiptStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(flt).forEach(each => {
        if (flt[each as TransferAndReceiptModelFilter] != undefined && receiptFilterDataMapper.has(each as TransferAndReceiptModelFilter)) {
          tmp.push(receiptFilterDataMapper.get(each as TransferAndReceiptModelFilter)|| '');
        }
      })
      this.receiptStore.updateSearchFilterLabels(tmp);
    })
  }

  updateReceiptState(params: TransferAndReceiptModel) {
    this.#changeTransferAndReceiptStateUseCase.execute(params).subscribe(res => {
      const receipt = this.receiptStore.state$().selectedReceipt$();
      const list = this.receiptStore.state$().receipts$();
      const index = list.findIndex(i => i.id == res.id);
      const updatedTransfer: TransferAndReceiptModel = {
        ...res,
        transferAndReceiptItems: receipt.transferAndReceiptItems
      };

      list.splice(index, 1, updatedTransfer);
      this.receiptStore.updateReceiptsTable([...list]);
      this.receiptStore.updateSelectedReceipt(updatedTransfer);

    });
  }

  @Cache()
  exportReceiptListExcelFile(filters: TransferAndReceiptModel) {
    this.#exportTransferAndReceiptListExcelFileUseCase.execute(filters).subscribe(
      res => {
        this.#generateFileService.generateDownloadableFile(res);
      }
    )
  }

  exportReceiptItemPdf(itemId: number) {
    this.#exportTransferAndReceiptItemPdfFileUseCase.execute(itemId).subscribe(
      res => {
        this.#generateFileService.generateDownloadableFile(res);
      }
    )
  }

}
