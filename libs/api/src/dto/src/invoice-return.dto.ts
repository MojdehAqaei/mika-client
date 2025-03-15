import { InvoiceReturnStateEnum } from '@domain/lib/purchase-and-orders';
import { Pagination } from "@view/lib/models";
import { AttachmentDto } from './attachment.dto';
import { FiscalYearDto } from "./fiscal-year.dto";
import { InvoiceReturnItemDto } from './invoice-return-item.dto';
import { PersonCompanyDto } from "./person-company.dto";
import { PurchaseInvoiceDto } from './purchase-invoice.dto';

export interface InvoiceReturnDto extends Pagination {
  id?: number;
  invoice?: PurchaseInvoiceDto;
  sellerPersonCompany?: PersonCompanyDto;
  invoiceNumber?: string;
  issueDate?: Date;
  additionsAmount?: number;
  deductionsAmount?: number;
  finalAmount?: number;
  description?: string;
  invoiceReturnItems?: InvoiceReturnItemDto[];
  stage?: InvoiceReturnStateEnum;
  documentNumber?: string;
  issueDateStart?: Date;
  issueDateEnd?: Date;
  fiscalPeriod?: FiscalYearDto;
  invoiceReturnDocuments?: AttachmentDto[];
}
