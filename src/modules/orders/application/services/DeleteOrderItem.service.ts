import { Injectable, BadRequestException } from '@nestjs/common';

import { OrderItemRepository } from '../repositories/OrderItemRepository';

interface DeleteOrderItemServiceRequest {
  orderItemId: string;
}

@Injectable()
export class DeleteOrderItemService {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async execute(data: DeleteOrderItemServiceRequest): Promise<void> {
    const orderItem = await this.orderItemRepository.findById(data.orderItemId);

    if (!orderItem) {
      throw new BadRequestException('Unable to find item.');
    }

    await this.orderItemRepository.delete(data.orderItemId);
  }
}
