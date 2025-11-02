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

  async findAll(filters: any = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const query: any = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' };
    }

    if (filters.genre) {
      query.genre = filters.genre;
    }

    if (filters.year) {
      query.year = parseInt(filters.year, 10);
    }

    if (filters.rating) {
      query.rating = { $gte: parseFloat(filters.rating) };
    }

    const [movies, total] = await Promise.all([
      this.movieModel.find(query).skip(skip).limit(limit).exec(),
      this.movieModel.countDocuments().exec(),
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
