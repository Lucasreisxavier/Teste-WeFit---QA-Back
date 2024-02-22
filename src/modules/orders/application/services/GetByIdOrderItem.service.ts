import { Injectable } from '@nestjs/common';

import { GetByIdOrderAndItem } from '../useCases/GetByIdOrderAndItem';

import { OrderAndItemTypes } from '../dtos/OrderAndItem.types';

interface GetByIdOrderItemServiceRequest {
  orderId: string;
}

@Injectable()
export class GetByIdOrderItemService {
  constructor(private getByIdOrderAndItem: GetByIdOrderAndItem) {}

  async execute(
    data: GetByIdOrderItemServiceRequest,
  ): Promise<OrderAndItemTypes> {
    const order = await this.getByIdOrderAndItem.execute(data.orderId);

    return order;
  }
}
