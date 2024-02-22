import { Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';

import { MovieRepository } from '../repositories/MovieRepository';

@Injectable()
export class GetListMoviesService {
  constructor(private movieRepository: MovieRepository) {}

  async execute(): Promise<Array<Movie>> {
    const movies = await this.movieRepository.getAll();

    return movies;
  }
}
