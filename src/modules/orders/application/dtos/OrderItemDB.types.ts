import { Movie } from '@prisma/client';

export interface OrderItemDBTypes {
  id: string;
  quantity: number;
  amount: number;
  orderId: string;
  movieId: string;
  movie: Movie;
}
