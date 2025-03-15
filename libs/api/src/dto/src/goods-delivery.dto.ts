import {
  GoodsDeliveryBaseDocumentTypeEnum,
  GoodsDeliveryStateEnum,
  GoodsDeliveryTypeEnum
} from '@domain/lib/purchase-and-orders';
import { GoodsDeliveryItemDto } from './goods-delivery-item.dto';
import { Pagination } from '@view/lib/models';
import { StockroomDto } from './stockroom.dto';
import { OrganizationDto } from './organization.dto';
import { PersonCompanyDto } from './person-company.dto';
import { FiscalYearDto } from './fiscal-year.dto';

export interface GoodsDeliveryDto extends Pagination {
  id?: number;
  deliveryDate?: Date;
  deliveryDateFrom?: Date;
  deliveryDateTo?: Date;
  documentNumber?: number;
  deliveryType?: GoodsDeliveryTypeEnum;
  stage?: GoodsDeliveryStateEnum;
  relatedDocumentType?: GoodsDeliveryBaseDocumentTypeEnum;
  relatedDocumentNumber?: number;
  relatedDocumentDate?: Date;
  transferDate?: Date;
  deliveryFullName?: string;
  transferDescription?: string;
  receiptDate?: Date;
  receiverFullName?: string;
  receiptDescription?: string;
  description?: string;
  deliveryItems?: GoodsDeliveryItemDto[];
  deliveryInventory?: StockroomDto;
  receiverInventory?: StockroomDto;
  deliveryOrganization?: OrganizationDto;
  receiverOrganization?: OrganizationDto;
  deliveryPersonCompany?: PersonCompanyDto;
  receiverPersonCompany?: PersonCompanyDto;
  fiscalPeriod?: FiscalYearDto;
  sendDate?: Date;
  sendToFullName?: string;
  sendDescription?: string;
  receiveDate?: Date;
  receiveFromFullName?: string;
  receiveDescription?: string;
}
