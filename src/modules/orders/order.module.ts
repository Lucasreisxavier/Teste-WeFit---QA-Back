import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/infra/database/database.module';

import { OrderController } from './infra/controller/Order.controller';

import { BuyOrderService } from './application/services/BuyOrder.service';
import { CreateOrderItemService } from './application/services/CreateOrderItem.service';
import { DeleteOrderItemService } from './application/services/DeleteOrderItem.service';
import { GetByIdOrderItemService } from './application/services/GetByIdOrderItem.service';
import { UpdateQuantityOrderItemService } from './application/services/updateQuantityOrderItem.service';

import { CreateOrder } from './application/useCases/CreateOrder';
import { GetByIdOrderAndItem } from './application/useCases/GetByIdOrderAndItem';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [
    CreateOrder,
    BuyOrderService,
    GetByIdOrderAndItem,
    CreateOrderItemService,
    DeleteOrderItemService,
    GetByIdOrderItemService,
    UpdateQuantityOrderItemService,
  ],
})
export class OrderModule {}
