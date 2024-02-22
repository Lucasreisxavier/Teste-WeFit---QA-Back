import { Injectable } from '@nestjs/common';

import { OrderRepository } from '../repositories/OrderRepository';

interface CreateOrderResponse {
  id: string;
}

@Injectable()
export class CreateOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<CreateOrderResponse> {
    const order = await this.orderRepository.create();

    return {
      id: order.id,
    };
  }
}
