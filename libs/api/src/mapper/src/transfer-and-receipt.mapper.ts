import { TransferAndReceiptModel } from '@domain/lib/stockroom';
import { TransferAndReceiptDto } from '../../dto';
import { Mapper } from '../../misc';
import { TransferAndReceiptItemMapper } from './transfer-and-receipt-item.mapper';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';

export class TransferAndReceiptMapper implements Mapper<TransferAndReceiptModel, TransferAndReceiptDto> {
  mapFrom(param: TransferAndReceiptModel): TransferAndReceiptDto {
    return {
      id: param.id,
      stage: param.state,
      documentNumber: param.autoGeneratedCode,
      documentType: {
        id: param.typeId,
        title: param.typeLabel,
        parentName: param.parentType
      },
      issueDate: param.date,
      issueDateTo: param.toDate,
      issueDateFrom: param.fromDate,
      inventory: { id: param.stockroomId },
      description: param.description,
      fiscalPeriod: { id: param.fiscalYearId },
      inventoryDocumentItems: param.transferAndReceiptItems?.map(each => new TransferAndReceiptItemMapper().mapFrom(each))
    };
  }

  mapTo(param: TransferAndReceiptDto): TransferAndReceiptModel {
    return {
      id: param.id,
      autoGeneratedCode: param.documentNumber,
      state: param.stage,
      typeId: param.documentType?.id,
      typeLabel: param.documentType?.title,
      parentType: param.documentType?.parentName,
      totalElements: param.totalElements,
      date: param.issueDate,
      fromDate: param.issueDateFrom,
      toDate: param.issueDateTo,
      datePersian: param.issueDate ? formatDate(param.issueDate, 'YYYY/MM/DD') : '',
      stockroomId: param.inventory?.id,
      stockroomTitle: param.inventory?.title,
      fiscalYearId: param.fiscalPeriod?.id,
      description: param.description,
      transferAndReceiptItems: param.inventoryDocumentItems?.map(each => new TransferAndReceiptItemMapper().mapTo(each)),
    };
  }
}
