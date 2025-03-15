import { OrderStateEnum, OrderTypeEnum, SupplyMethodEnum } from "@domain/lib/purchase-and-orders";
import { Pagination } from "@view/lib/models";
import { AttachmentDto } from './attachment.dto';
import { FiscalYearDto } from "./fiscal-year.dto";
import { OrderItemDto } from "./order-item.dto";
import { OrganizationDto } from "./organization.dto";
import { UserDto } from './user.dto';

export interface OrderDto extends Pagination {
    id?: number;
    ordererOrganization?: OrganizationDto;
    agentUser?: UserDto;
    stage?: OrderStateEnum;
    documentNumber?: number;
    orderDate?: Date;
    orderDateFrom?: Date;
    orderDateTo?: Date;
    orderType?: OrderTypeEnum;
    supplyMethod?: SupplyMethodEnum;
    description?: string;
    orderItems?: OrderItemDto[];
    fiscalPeriod?: FiscalYearDto;
    orderDocuments?: AttachmentDto[];
}
