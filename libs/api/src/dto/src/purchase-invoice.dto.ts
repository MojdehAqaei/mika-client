import { InvoiceStateEnum } from '@domain/lib/purchase-and-orders';
import { Pagination } from "@view/lib/models";
import { AttachmentDto } from './attachment.dto';
import { FiscalYearDto } from "./fiscal-year.dto";
import { InvoiceItemDto } from "./invoice-item.dto";
import { OrderDto } from "./order.dto";
import { PersonCompanyDto } from "./person-company.dto";

export interface PurchaseInvoiceDto extends Pagination {
    id?: number;
    order?: OrderDto;
    sellerPersonCompany?: PersonCompanyDto;
    invoiceNumber?: string;
    issueDate?: Date;
    additionsAmount?: number;
    deductionsAmount?: number;
    finalAmount?: number;
    description?: string;
    invoiceItems?: InvoiceItemDto[];
    stage?: InvoiceStateEnum;
    documentNumber?: string;
    issueDateStart?: Date;
    issueDateEnd?: Date;
    fiscalPeriod?: FiscalYearDto;
    invoiceDocuments?: AttachmentDto[];
}
