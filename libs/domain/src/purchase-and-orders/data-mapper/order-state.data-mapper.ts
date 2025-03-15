import { ClSelectItem } from '@sadad/component-lib/src/models';
import { OrderStateEnum } from '../enum/order-state.enum';

export const orderStateDataMapper = new Map<OrderStateEnum, string>([
  [OrderStateEnum.INITIAL_SUBMIT, 'ثبت اولیه'],
  [OrderStateEnum.WAIT_FOR_DELIVERY, 'در انتظار تحویل'],
  [OrderStateEnum.WAIT_FOR_FEE_ESTIMATION, 'در انتظار برآورد مبلغ'],
  [OrderStateEnum.WAIT_FOR_BUDGET_ACCEPTANCE, 'در انتظار تایید بودجه'],
  [OrderStateEnum.WAIT_FOR_BUY, 'در انتظار خرید'],
  [OrderStateEnum.FINISH_ORDER, 'اتمام سفارش'],
  [OrderStateEnum.CANCEL_ORDER, 'لغو شده'],
]);

export const orderStateOptions: ClSelectItem[] = Object.keys(
  OrderStateEnum
).map((each) => {
  return {
    value: each,
    label: orderStateDataMapper.get(each as OrderStateEnum),
  };
});
