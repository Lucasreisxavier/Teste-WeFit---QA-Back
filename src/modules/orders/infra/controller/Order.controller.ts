import {
  Controller,
  Patch,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';

import { BuyOrderService } from '../../application/services/BuyOrder.service';
import { CreateOrderItemService } from '../../application/services/CreateOrderItem.service';
import { DeleteOrderItemService } from '../../application/services/DeleteOrderItem.service';
import { GetByIdOrderItemService } from '../../application/services/GetByIdOrderItem.service';
import { UpdateQuantityOrderItemService } from '../../application/services/updateQuantityOrderItem.service';

import { BuyOrderDTO } from './dto/BuyOrderDTO';
import { UpdateItemDTO } from './dto/UpdateItemDTO';
import { CreateItemDTO } from './dto/CreateItemDTO';

const createOrderItemBodySchema = z.object({
  orderId: z.string().optional(),
  movieId: z.string(),
  quantity: z.number(),
});

const updateOrderItemBodySchema = z.object({
  quantity: z.number(),
});

const buyOrderBodySchema = z.object({
  orderId: z.string(),
});

@Controller('order')
export class OrderController {
  constructor(
    private buyOrderService: BuyOrderService,
    private createOrderItemService: CreateOrderItemService,
    private deleteOrderItemService: DeleteOrderItemService,
    private getByIdOrderItemService: GetByIdOrderItemService,
    private updateQuantityOrderItemService: UpdateQuantityOrderItemService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createOrderItemBodySchema))
  async create(
    @Body() body: CreateItemDTO,
  ) {
    const { orderId, movieId, quantity } = body;

    const orderItem = await this.createOrderItemService.execute({
      movieId,
      quantity,
      orderId,
    });

    return {
      ...orderItem,
    };
  }

  @Get(':id')
  async getAll(@Param('id') orderId: string) {
    return await this.getByIdOrderItemService.execute({ orderId });
  }

  @Delete('/item/:id')
  @HttpCode(204)
  async deleteItem(@Param('id') orderItemId: string) {
    await this.deleteOrderItemService.execute({ orderItemId });
  }

  @Patch('/item/:id')
  @UsePipes(new ZodValidationPipe(updateOrderItemBodySchema))
  async update(
    @Param('id') orderItemId: string,
    @Body() body: UpdateItemDTO,
  ) {
    const { quantity } = body;

    const orderItem = await this.updateQuantityOrderItemService.execute({
      orderItemId,
      quantity,
    });

    return {
      ...orderItem,
    };
  }

  @Post('/buy')
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(buyOrderBodySchema))
  async buyOrder(
    @Body() body: BuyOrderDTO,
  ) {
    const { orderId } = body;
    
    await this.buyOrderService.execute({
      orderId,
    });
  }
}
