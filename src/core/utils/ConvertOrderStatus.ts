import { OrderStatusEnum } from '../constants/OrderStatusEnum';

export default function ConvertOrderStatus(orderStatus: OrderStatusEnum) {
  if (orderStatus === OrderStatusEnum.OPENED) {
    return 'opened';
  } else {
    return 'finished';
  }
}
