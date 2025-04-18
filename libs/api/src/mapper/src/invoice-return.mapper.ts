import { InvoiceReturnDto } from '@api/lib/dto';
import { InvoiceReturnModel, invoiceReturnStateDataMapper } from '@domain/lib/purchase-and-orders';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { Mapper } from '../../misc';
import { AttachmentMapper } from './attachment.mapper';
import { InvoiceReturnItemMapper } from './invoice-return-item.mapper';
import { PersonCompanyMapper } from './person-company.mapper';
import { PurchaseInvoiceItemMapper } from './purchase-invoice-item.mapper';
import { PurchaseInvoiceMapper } from './purchase-invoice.mapper';

export class InvoiceReturnMapper implements Mapper<InvoiceReturnModel, InvoiceReturnDto> {
  mapFrom(param: InvoiceReturnModel): InvoiceReturnDto {
    return {
      id: param.id,
      invoice: param.purchaseInvoiceAutoGeneratedCode ? { documentNumber: param.purchaseInvoiceAutoGeneratedCode } : new PurchaseInvoiceMapper().mapFrom(param.purchaseInvoice?.value || param.purchaseInvoice || {}),
      documentNumber: param.autoGeneratedCode,
      invoiceNumber: param.invoiceNumber,
      issueDate: param.date,
      stage: param.state,
      issueDateStart: param.fromDate,
      issueDateEnd: param.toDate,
      sellerPersonCompany: { id: param.seller?.id, title: param.seller?.name },
      fiscalPeriod: {
        id: param.fiscalYearId,
      },
      deductionsAmount: param.invoiceDetail?.deductionsAmount || 0,
      additionsAmount: param.invoiceDetail?.additionsAmount || 0,
      finalAmount: param.invoiceDetail?.finalAmount || 0,
      invoiceReturnItems: param.invoiceDetail?.invoiceItemList
        ? param.invoiceDetail.invoiceItemList.map((item) =>
          new InvoiceReturnItemMapper().mapFrom(item)
        ) : undefined,
      description: param.description,
      invoiceReturnDocuments: param.attachedFiles?.map(each => new AttachmentMapper().mapFrom(each))
    };
  }
  mapTo(param: InvoiceReturnDto): InvoiceReturnModel {
    return {
      id: param.id,
      purchaseInvoice: { label: String(param.invoice?.documentNumber), value: new PurchaseInvoiceMapper().mapTo(param.invoice || {}) },
      purchaseInvoiceItems: param.invoice?.invoiceItems?.map(item => ({ label: String(item.goodsService?.title), value: new PurchaseInvoiceItemMapper().mapTo(item || {}) })),
      autoGeneratedCode: param.documentNumber,
      invoiceNumber: param.invoiceNumber,
      description: param.description,
      date: new Date(param.issueDate || new Date()),
      fromDate: param.issueDateStart,
      toDate: param.issueDateEnd,
      datePersian: param.issueDate
        ? formatDate(param.issueDate, 'YYYY/MM/DD')
        : '',
      state: param.stage,
      invoiceStateString: param.stage && invoiceReturnStateDataMapper.has(param.stage) ? invoiceReturnStateDataMapper.get(param.stage) : '',
      seller: param.sellerPersonCompany ? new PersonCompanyMapper().mapTo(param.sellerPersonCompany) : undefined,
      invoiceDetail: {
        deductionsAmount: param.deductionsAmount,
        additionsAmount: param.additionsAmount,
        finalAmount: param.finalAmount,
        finalAmountGrouped: param.finalAmount?.toString() ? param.finalAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '',
        invoiceItemList: param.invoiceReturnItems
          ? param.invoiceReturnItems.map((item) =>
            new InvoiceReturnItemMapper().mapTo(item)
          )
          : undefined,
      },
      totalElements: param.totalElements,
      fiscalYearId: param.fiscalPeriod?.id,
      attachedFiles: param.invoiceReturnDocuments?.map(each => new AttachmentMapper().mapTo(each))

    };
  }
}
