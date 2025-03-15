import { ApplicationRoutes } from '@view/lib/data-types';
import { PermissionNames } from '../enum/permission-name.enum';

const permissionToRouteDataMapper = new Map([
  [PermissionNames.role, `${ApplicationRoutes.inventory}/${ApplicationRoutes.userManagement}/${ApplicationRoutes.roles}`],
  [PermissionNames.user, `${ApplicationRoutes.inventory}/${ApplicationRoutes.userManagement}/${ApplicationRoutes.users}`],
  [PermissionNames.permission, `${ApplicationRoutes.inventory}/${ApplicationRoutes.userManagement}/${ApplicationRoutes.userContentAccess}`],

  [PermissionNames.goodsServiceCategory, `${ApplicationRoutes.inventory}/${ApplicationRoutes.baseData}/${ApplicationRoutes.goodsAndServicesGroup}`],
  [PermissionNames.measurement, `${ApplicationRoutes.inventory}/${ApplicationRoutes.baseData}/${ApplicationRoutes.unitOfMeasure}`],
  [PermissionNames.goodsServiceProperty, `${ApplicationRoutes.inventory}/${ApplicationRoutes.baseData}/${ApplicationRoutes.goodsAndServicesFeatures}`],
  [PermissionNames.goodsService, `${ApplicationRoutes.inventory}/${ApplicationRoutes.baseData}/${ApplicationRoutes.goodsAndServices}`],
  [PermissionNames.personCompany, `${ApplicationRoutes.inventory}/${ApplicationRoutes.baseData}/${ApplicationRoutes.personAndCompany}`],

  [PermissionNames.inventory, `${ApplicationRoutes.inventory}/${ApplicationRoutes.stockroom}/${ApplicationRoutes.stockroomManagement}`],
  [PermissionNames.inventoryType, `${ApplicationRoutes.inventory}/${ApplicationRoutes.stockroom}/${ApplicationRoutes.inventoryType}`],
  [PermissionNames.fiscalPeriod, `${ApplicationRoutes.inventory}/${ApplicationRoutes.stockroom}/${ApplicationRoutes.fiscalYear}`],
  [PermissionNames.fiscalPeriodStatus, `${ApplicationRoutes.inventory}/${ApplicationRoutes.stockroom}/${ApplicationRoutes.fiscalYearPerStockroom}`],
  [PermissionNames.receipt, `${ApplicationRoutes.inventory}/${ApplicationRoutes.stockroom}/${ApplicationRoutes.receipt}`],
  [PermissionNames.transfer, `${ApplicationRoutes.inventory}/${ApplicationRoutes.stockroom}/${ApplicationRoutes.transfer}`],
  [PermissionNames.inventoryCounting, `${ApplicationRoutes.inventory}/${ApplicationRoutes.stockroom}/${ApplicationRoutes.warehousing}`],

  [PermissionNames.delivery, `${ApplicationRoutes.inventory}/${ApplicationRoutes.purchaseAndOrders}/${ApplicationRoutes.goodsDelivery}`],
  [PermissionNames.purchase, `${ApplicationRoutes.inventory}/${ApplicationRoutes.purchaseAndOrders}/${ApplicationRoutes.purchaseInvoice}`],
  [PermissionNames.goodsServiceOrder, `${ApplicationRoutes.inventory}/${ApplicationRoutes.purchaseAndOrders}/${ApplicationRoutes.order}`],
  [PermissionNames.purchaseReturn, `${ApplicationRoutes.inventory}/${ApplicationRoutes.purchaseAndOrders}/${ApplicationRoutes.invoiceReturn}`],
  [PermissionNames.PurchaseReference, `${ApplicationRoutes.inventory}/${ApplicationRoutes.purchaseAndOrders}/${ApplicationRoutes.purchaseSteps}`],
  [PermissionNames.priceEstimate, `${ApplicationRoutes.inventory}/${ApplicationRoutes.purchaseAndOrders}/${ApplicationRoutes.priceEstimate}`],
]);

export default permissionToRouteDataMapper;
