import { OrderModel, orderStateDataMapper } from '@domain/lib/purchase-and-orders';
import { Mapper } from '../../misc';
import { OrderDto } from '../../dto';
import { OrderItemMapper } from './order-item.mapper';
import { formatDate } from '@sadad/component-lib/src/lib/date-picker';
import { UserMapper } from './user.mapper';
import { AttachmentMapper } from './attachment.mapper';

export class OrderMapper implements Mapper<OrderDto, OrderModel> {
  mapFrom(param: OrderModel): OrderDto {
    return {
      id: param.id,
      ordererOrganization: {
        id: param.orderingOrganizationId
      },
      agentUser: param.agent ? new UserMapper().mapFrom(param.agent) : undefined,
      stage: param.state,
      documentNumber: param.autoGeneratedCode,
      orderDate: param.date,
      orderDateFrom: param.fromDate,
      orderDateTo: param.toDate,
      orderType: param.orderType,
      supplyMethod: param.supplyMethod,
      description: param.description,
      orderItems:  param.orderItems?.map(each => new OrderItemMapper().mapFrom(each)),
      fiscalPeriod: {
        id: param.fiscalYearId
      },
      orderDocuments: param.attachedFiles?.map(each => new AttachmentMapper().mapFrom(each))
    };
  }


  mapTo(param: OrderDto): OrderModel {
    return {
      id: param.id,
      orderingOrganizationId: param.ordererOrganization?.id,
      orderingOrganizationLabel: `${param.ordererOrganization?.typeName} ${param.ordererOrganization?.name}`,
      agent: param.agentUser ? new UserMapper().mapTo(param.agentUser) : undefined,
      state: param.stage,
      stateString: param.stage && orderStateDataMapper.has(param.stage) ? orderStateDataMapper.get(param.stage) : '',
      autoGeneratedCode: param.documentNumber,
      // @ts-ignore
      date: new Date(param.orderDate),
      datePersian: param.orderDate ? formatDate(param.orderDate, 'YYYY/MM/DD') : '',
      fromDate: param.orderDateFrom,
      toDate: param.orderDateTo,
      orderType: param.orderType,
      supplyMethod: param.supplyMethod,
      description: param.description,
      orderItems:  param.orderItems?.map(each => new OrderItemMapper().mapTo(each)),
      fiscalYearId: param.fiscalPeriod?.id,
      totalElements: param.totalElements,
      attachedFiles: param.orderDocuments?.map(each => new AttachmentMapper().mapTo(each))
    };
  }
}
