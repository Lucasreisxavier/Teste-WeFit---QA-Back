import { OrderItem } from '@prisma/client';
import { CreateOrderItemTypes } from '../dtos/CreateOrderItem.types';

export abstract class OrderItemRepository {
  abstract updateQuantityAndAmount(
    id: string,
    quantity: number,
    amount: number,
  ): Promise<OrderItem>;
  abstract create(data: CreateOrderItemTypes): Promise<OrderItem>;
  abstract findById(id: string): Promise<OrderItem | null>;
  abstract delete(id: string): Promise<void>;
  abstract findByOrderIdAndMovieId(orderId: string, movieId: string): Promise<OrderItem | null>
}
