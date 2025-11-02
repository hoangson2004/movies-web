import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepo: MoviesRepository) {}

  async findAll(
    filters: any = {},
    page = 1,
    limit = 10,
    sort: { sortBy?: string; order?: 'asc' | 'desc' } = {},
  ) {
    const { movies, total } = await this.moviesRepo.findAll(
      filters,
      page,
      limit,
      sort,
    );
    return {
      data: movies,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const movie = await this.moviesRepo.findById(id);
    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);
    return movie;
  }

  async create(dto: CreateMovieDto) {
    return this.moviesRepo.create(dto);
  }

  async update(id: string, dto: UpdateMovieDto) {
    const movie = await this.moviesRepo.update(id, dto);
    if (!movie) throw new NotFoundException(`Movie with id ${id} not found`);
    return movie;
  }

  async remove(id: string) {
    const deleted = await this.moviesRepo.delete(id);
    if (!deleted) throw new NotFoundException(`Movie with id ${id} not found`);
    return deleted;
  }

  async findGenres() {
    return this.moviesRepo.findGenres();
  }
}
