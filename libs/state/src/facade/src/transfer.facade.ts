import { inject, Injectable } from '@angular/core';
import { Cache } from '@sadad/component-lib/src/decorators';
import {
  transferFilterDataMapper,
  GetTransfersAndReceiptsUseCase,
  TransferAndReceiptModel,
  TransferAndReceiptModelFilter,
  ChangeTransferAndReceiptStateUseCase,
  TransferAndReceiptTypeEnum,
  ExportTransferAndReceiptListExcelFileUseCase,
  ExportTransferAndReceiptItemPdfFileUseCase
} from '@domain/lib/stockroom';
import { TransferStore } from '../../store';
import { Crud } from "@view/lib/data-types";
import { ClGenerateFileService } from '@sadad/component-lib/src/services';


@Injectable()
export class TransferFacade {
  public transferStore = inject(TransferStore);

  readonly #generateFileService = inject(ClGenerateFileService);

  readonly #getTransfersUseCase = inject(GetTransfersAndReceiptsUseCase);
  readonly #changeTransferAndReceiptStateUseCase = inject(ChangeTransferAndReceiptStateUseCase);
  readonly #exportTransferAndReceiptListExcelFileUseCase = inject(ExportTransferAndReceiptListExcelFileUseCase);
  readonly #exportTransferAndReceiptItemPdfFileUseCase = inject(ExportTransferAndReceiptItemPdfFileUseCase);


  constructor() {
    this.transferStore.updatePageNumber(0);
  }

  updateSelectedTransfer(transfer: TransferAndReceiptModel) {
    this.transferStore.updateSelectedTransfer(transfer);
  }

  toggleDialogVisibility(visible: boolean) {
    this.transferStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.transferStore.updatePageSize(pageSize);
    this.transferStore.updatePageNumber(pageNumber);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.transferStore.updateAllowedActions(actions);
  }

  @Cache()
  updateTransferList(filters: TransferAndReceiptModel) {
    const flt: TransferAndReceiptModel = {
      ...filters,
      parentType: TransferAndReceiptTypeEnum.TRANSFER
    }
    this.#getTransfersUseCase.execute(flt).subscribe(res => {
      this.transferStore.updateTransferTable(res);
      res?.length && res[0].totalElements ? this.transferStore.updateTotal(res[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(flt).forEach(each => {
        if (flt[each as TransferAndReceiptModelFilter] != undefined && transferFilterDataMapper.has(each as TransferAndReceiptModelFilter)) {
          tmp.push(transferFilterDataMapper.get(each as TransferAndReceiptModelFilter)|| '');
        }
      })
      this.transferStore.updateSearchFilterLabels(tmp);
    });
  }

  updateTransferState(params: TransferAndReceiptModel) {
    this.#changeTransferAndReceiptStateUseCase.execute(params).subscribe(res => {
      const transfer = this.transferStore.state$().selectedTransfer$();
      const list = this.transferStore.state$().transfers$();
      const index = list.findIndex(i => i.id == res.id);
      const updatedTransfer: TransferAndReceiptModel = {
        ...res,
        transferAndReceiptItems: transfer.transferAndReceiptItems
      };

      list.splice(index, 1, updatedTransfer);
      this.transferStore.updateTransferTable([...list]);
      this.transferStore.updateSelectedTransfer(updatedTransfer);

    });
  }

  @Cache()
  exportTransferListExcelFile(filters: TransferAndReceiptModel) {
    this.#exportTransferAndReceiptListExcelFileUseCase.execute(filters).subscribe(
      res => {
        this.#generateFileService.generateDownloadableFile(res);
      }
    )
  }

  exportTransferItemPdf(itemId: number) {
    this.#exportTransferAndReceiptItemPdfFileUseCase.execute(itemId).subscribe(
      res => {
        this.#generateFileService.generateDownloadableFile(res);
      }
    )
  }
}
