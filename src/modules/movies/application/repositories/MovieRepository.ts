import { Movie } from '@prisma/client';

export abstract class MovieRepository {
  abstract getAll(): Promise<Array<Movie>>;
  abstract findById(id: string): Promise<Movie | null>;
}
