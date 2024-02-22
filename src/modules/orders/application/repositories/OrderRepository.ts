import { Order } from '@prisma/client';
import { OrderDBTypes } from '../dtos/OrderDB.types';

export abstract class OrderRepository {
  abstract create(): Promise<Order>;
  abstract findByOrderId(orderId: string): Promise<Order | null>;
  abstract findOrderAndItemsByOrderId(
    orderId: string,
  ): Promise<OrderDBTypes | null>;
  abstract update(orderId: string, status: number): Promise<void>;
}
