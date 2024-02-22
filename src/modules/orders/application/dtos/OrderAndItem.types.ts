import { OrderItemTypes } from './OrderItem.types';

export interface OrderAndItemTypes {
  id: string;
  status: string;
  items: Array<OrderItemTypes>;
}
