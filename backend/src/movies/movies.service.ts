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

  async getRecommendations(movieId: string, limit = 10) {
    const base = await this.moviesRepo.findById(movieId);
    if (!base) throw new Error('Movie not found');

    const allMovies = await this.moviesRepo.findAllExceptId(movieId);

    const baseGenres = Array.isArray(base.genre) ? base.genre : [base.genre];
    const baseStars = base.stars || [];
    const baseWords = base.title.toLowerCase().split(/\s+/);

    const results = allMovies.map((movie) => {
      // --- Genre similarity ---
      const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
      const genreMatch = genres.filter((g) => baseGenres.includes(g)).length;
      const genreScore = (genreMatch / baseGenres.length) * 20;

      // --- Stars similarity ---
      const stars = movie.stars || [];
      const starMatch = stars.filter((s) =>
        baseStars.some((b) => b.toLowerCase() === s.toLowerCase()),
      ).length;
      const starScore = (starMatch / (baseStars.length || 1)) * 20;

      // --- Rating ---
      const ratingScore = ((movie.rating || 0) / 10) * 15;

      // --- View ---
      const viewScore = Math.min((movie.views || 0) / 50000, 1) * 15;

      // --- Title similarity (word overlap / n-gram cơ bản) ---
      const words = movie.title.toLowerCase().split(/\s+/);
      const wordMatch = words.filter((w) => baseWords.includes(w)).length;
      const titleScore = (wordMatch / baseWords.length) * 30;

      const total =
        genreScore + starScore + ratingScore + viewScore + titleScore;

      return {
        movieId: movie._id,
        title: movie.title,
        score: Math.round(total * 100) / 100,
      };
    });

    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
