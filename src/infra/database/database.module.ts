import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { PrismaMovieRepository } from '../../modules/movies/infra/database/prisma/repositories/MovieRepository';
import { PrismaOrderRepository } from '@/modules/orders/infra/database/prisma/repositories/OrderRepository';
import { PrismaOrderItemRepository } from '@/modules/orders/infra/database/prisma/repositories/OrderItemRepository';

import { MovieRepository } from '../../modules/movies/application/repositories/MovieRepository';
import { OrderRepository } from '@/modules/orders/application/repositories/OrderRepository';
import { OrderItemRepository } from '@/modules/orders/application/repositories/OrderItemRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MovieRepository,
      useClass: PrismaMovieRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
    {
      provide: OrderItemRepository,
      useClass: PrismaOrderItemRepository,
    },
  ],
  exports: [MovieRepository, OrderRepository, OrderItemRepository],
})
export class DatabaseModule {}
