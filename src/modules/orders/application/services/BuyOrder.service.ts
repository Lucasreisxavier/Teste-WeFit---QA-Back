import { Injectable, BadRequestException } from '@nestjs/common';

import { OrderRepository } from '../repositories/OrderRepository';

import { OrderStatusEnum } from '@/core/constants/OrderStatusEnum';

interface BuyOrderServiceRequest {
  orderId: string;
}

@Injectable()
export class BuyOrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  async execute(data: BuyOrderServiceRequest): Promise<void> {
    const orderItem = await this.orderRepository.findByOrderId(data.orderId);

    if (!orderItem) {
      throw new BadRequestException('Unable to find item.');
    }

    await this.orderRepository.update(data.orderId, OrderStatusEnum.FINISHED);
  }
}
