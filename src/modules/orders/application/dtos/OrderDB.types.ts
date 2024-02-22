import { OrderItemDBTypes } from './OrderItemDB.types';

export interface OrderDBTypes {
  id: string;
  status: number;
  OrderItem: Array<OrderItemDBTypes>;
}
