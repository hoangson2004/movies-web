import 'dotenv/config';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import { Movie, MovieSchema } from '../src/movies/schemas/movie.schema';

const MovieModel = mongoose.model('Movie', MovieSchema);

// Token TMDB API v4
const TMDB_TOKEN = process.env.TMDB_V4_TOKEN;

// 🧠 Hàm fetch TMDB theo title + year
async function fetchFromTMDB(title, year) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    title
  )}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const json: any = await res.json();

    if (json.results && json.results.length > 0) {
      // Chọn kết quả khớp nhất
      const best = json.results[0];

      const posterUrl = best.poster_path
        ? `https://image.tmdb.org/t/p/w500${best.poster_path}`
        : null;

      const backdropUrl = best.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${best.backdrop_path}`
        : null;

      return { posterUrl, backdropUrl, matchTitle: best.title };
    }
    return null;
  } catch (err) {
    console.error(`❌ Fetch TMDB failed for ${title} (${year}):`, err.message);
    return null;
  }
}

// 🧩 Cập nhật DB
async function updateMovies() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movies');

  // Lấy phim chưa có poster hoặc null
  const movies = await MovieModel.find({
    backdrop: null
  });


  console.log(`🎬 Found ${movies.length} movies to update`);

  for (const movie of movies) {
    const { title, year } = movie;
    console.log(`🔍 Fetching "${title}" (${year})...`);

    const result = await fetchFromTMDB(title, year);
    if (result) {
      movie.poster = result.posterUrl || movie.poster;
      movie.backdrop = result.backdropUrl || movie.backdrop;
      await movie.save();
      console.log(`✅ Updated ${title} → ${result.matchTitle}`);
    } else {
      console.log(`⚠️ No match for "${title}" (${year})`);
    }

    // sleep nhỏ để tránh rate limit
    await new Promise((r) => setTimeout(r, 5));
  }

  await mongoose.disconnect();
  console.log('🏁 Done updating posters.');
}

updateMovies();
