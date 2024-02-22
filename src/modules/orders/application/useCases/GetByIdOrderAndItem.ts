import { BadRequestException, Injectable } from '@nestjs/common';

import { OrderRepository } from '../repositories/OrderRepository';

import { OrderItemTypes } from '../dtos/OrderItem.types';
import { OrderAndItemTypes } from '../dtos/OrderAndItem.types';

import ConvertOrderStatus from '@/core/utils/ConvertOrderStatus';

@Injectable()
export class GetByIdOrderAndItem {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string): Promise<OrderAndItemTypes> {
    const order = await this.orderRepository.findOrderAndItemsByOrderId(id);

    if (!order) {
      throw new BadRequestException('Unable to find order.');
    }

    const orderItems = order.OrderItem.map((data) => {
      return {
        id: data.id,
        amount: data.amount,
        quantity: data.quantity,
        imageUrl: data.movie.imageUrl,
        price: data.movie.price,
        name: data.movie.name,
      } as OrderItemTypes;
    });

    return {
      id: order.id,
      status: ConvertOrderStatus(order.status),
      items: orderItems,
    };
  }
}
