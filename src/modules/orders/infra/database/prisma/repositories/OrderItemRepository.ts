import { OrderItem } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/database/prisma/prisma.service';

import { OrderItemRepository } from '@/modules/orders/application/repositories/OrderItemRepository';

import { CreateOrderItemTypes } from '@/modules/orders/application/dtos/CreateOrderItem.types';

@Injectable()
export class PrismaOrderItemRepository implements OrderItemRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderItemTypes): Promise<OrderItem> {
    return await this.prisma.orderItem.create({
      data: {
        movieId: data.movieId,
        amount: data.amount,
        quantity: data.quantity,
        orderId: data.orderId,
      },
    });
  }

  async findById(id: string): Promise<OrderItem | null> {
    return await this.prisma.orderItem.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.orderItem.delete({
      where: {
        id,
      },
    });
  }

  async updateQuantityAndAmount(
    id: string,
    quantity: number,
    amount: number,
  ): Promise<OrderItem> {
    return await this.prisma.orderItem.update({
      where: {
        id,
      },
      data: {
        quantity,
        amount,
      },
    });
  }

  async findByOrderIdAndMovieId(orderId: string, movieId: string): Promise<OrderItem | null> {
    return await this.prisma.orderItem.findFirst({
      where: {
        movieId,
        orderId
      },
    });
  }
}
