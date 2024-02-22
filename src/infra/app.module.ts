import { Module } from '@nestjs/common';

import { MovieModule } from '@/modules/movies/movie.module';
import { OrderModule } from '@/modules/orders/order.module';

@Module({
  imports: [MovieModule, OrderModule],
})
export class AppModule {}
