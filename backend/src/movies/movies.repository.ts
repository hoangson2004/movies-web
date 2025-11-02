import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<Movie>,
  ) {}

  private allowedSortFields = new Set(['title', 'year', 'rating', 'genre', 'views']);

  async findAll(
    filters: any = {},
    page = 1,
    limit = 10,
    sort: { sortBy?: string; order?: 'asc' | 'desc' } = {},
  ) {
    const skip = (page - 1) * limit;
    const query: any = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' };
    }

    if (filters.genre) {
      query.genre = { $in: [filters.genre] }; // vì schema genre là array
    }

    if (filters.year) {
      query.year = parseInt(filters.year, 10);
    }

    if (filters.rating) {
      query.rating = { $gte: parseFloat(filters.rating) };
    }

    let sortObj: any = {};
    if (sort && sort.sortBy && this.allowedSortFields.has(sort.sortBy)) {
      sortObj[sort.sortBy] = sort.order === 'desc' ? -1 : 1;
    } else {
      sortObj = { createdAt: -1 };
    }

    const [movies, total] = await Promise.all([
      this.movieModel.find(query).sort(sortObj).skip(skip).limit(limit).exec(),
      this.movieModel.countDocuments(query).exec(),
    ]);
    return { movies, total };
  }

  async findById(id: string) {
    return this.movieModel.findById(id).exec();
  }

  async create(createMovieDto: CreateMovieDto) {
    const newMovie = new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.movieModel.findByIdAndDelete(id).exec();
  }

  async findGenres() {
    const genres = await this.movieModel.distinct('genre').exec();
    return genres;
  }
}
