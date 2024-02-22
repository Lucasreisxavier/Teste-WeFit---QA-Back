import { Injectable } from '@nestjs/common';
import { Movie } from '@prisma/client';

import { PrismaService } from '../../../../../../infra/database/prisma/prisma.service';

import { MovieRepository } from '@/modules/movies/application/repositories/MovieRepository';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Array<Movie>> {
    const movies = await this.prisma.movie.findMany();

    return movies;
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id: id,
      },
    });

    return movie;
  }
}
