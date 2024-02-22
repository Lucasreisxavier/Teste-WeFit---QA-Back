import { Controller, Get } from '@nestjs/common';

import { GetListMoviesService } from '../../application/services/GetListMovies.service';

@Controller('movie')
export class MovieController {
  constructor(private getListMoviesService: GetListMoviesService) {}

  @Get()
  async getAll() {
    return await this.getListMoviesService.execute();
  }
}
