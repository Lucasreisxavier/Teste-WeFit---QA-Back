import { Module } from '@nestjs/common';

import { MovieController } from '@/modules/movies/infra/controller/Movie.controller';

@Module({
  controllers: [MovieController],
})
export class ControllerModule {}
