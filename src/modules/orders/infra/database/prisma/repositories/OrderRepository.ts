import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';

import { OrderStatusEnum } from '@/core/constants/OrderStatusEnum';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { OrderRepository } from '@/modules/orders/application/repositories/OrderRepository';

import { OrderDBTypes } from '@/modules/orders/application/dtos/OrderDB.types';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(): Promise<Order> {
    const Order = await this.prisma.order.create({
      data: { status: OrderStatusEnum.OPENED },
    });

    return Order;
  }

  async findByOrderId(orderId: string): Promise<Order | null> {
    return await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }

  async findOrderAndItemsByOrderId(
    orderId: string,
  ): Promise<OrderDBTypes | null> {
    const Order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          include: {
            movie: true,
          },
        },
      },
    });

    return Order;
  }

  async update(
    id: string,
    status: number,
  ): Promise<void> {
    await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
