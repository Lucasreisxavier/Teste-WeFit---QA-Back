import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateOrder } from '../useCases/CreateOrder';

import { OrderItemRepository } from '../repositories/OrderItemRepository';
import { MovieRepository } from '@/modules/movies/application/repositories/MovieRepository';
import { OrderRepository } from '../repositories/OrderRepository';

interface CreateOrderServiceRequest {
  orderId?: string;
  movieId: string;
  quantity: number;
}

interface CreateOrderServiceResponse {
  id: string;
  orderItemId: string;
  success: boolean;
}

@Injectable()
export class CreateOrderItemService {
  constructor(
    private orderItemRepository: OrderItemRepository,
    private orderRepository: OrderRepository,
    private movieRepository: MovieRepository,
    private createOrder: CreateOrder,
  ) {}

  async execute(
    data: CreateOrderServiceRequest,
  ): Promise<CreateOrderServiceResponse> {
    const movie = await this.movieRepository.findById(data.movieId);

    if (!movie) {
      throw new BadRequestException('Unable to find movie.');
    }

    if (!data.orderId) {
      const order = await this.createOrder.execute();

      const orderItem = await this.orderItemRepository.findByOrderIdAndMovieId(order.id, data.movieId);

      if (orderItem) {
        throw new BadRequestException('This film already exists in order.');
      }

      const orderItemCreate = await this.orderItemRepository.create({
        orderId: order.id,
        movieId: data.movieId,
        quantity: data.quantity,
        amount: data.quantity * movie.price,
      });

      return {
        id: order.id,
        orderItemId: orderItemCreate.id,
        success: true,
      };
    }

    const order = await this.orderRepository.findByOrderId(data.orderId);

    if (!order) {
      throw new BadRequestException('Unable to find order.');
    }

    const orderItem = await this.orderItemRepository.findByOrderIdAndMovieId(data.orderId, data.movieId);

    if (orderItem) {
      throw new BadRequestException('This film already exists in order.');
    }

    const orderItemCreate = await this.orderItemRepository.create({
      orderId: data.orderId,
      movieId: data.movieId,
      quantity: data.quantity,
      amount: data.quantity * movie.price,
    });

    return {
      id: data.orderId,
      orderItemId: orderItemCreate.id,
      success: true,
    };
  }
}
