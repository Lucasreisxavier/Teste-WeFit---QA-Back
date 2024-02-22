import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { MovieController } from './infra/controller/Movie.controller';

import { GetListMoviesService } from './application/services/GetListMovies.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController],
  providers: [GetListMoviesService],
})
export class MovieModule {}
