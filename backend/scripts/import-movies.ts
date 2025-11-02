import * as fs from 'fs';
const csv = require('csv-parser');
import mongoose, { Model } from 'mongoose';
import { Movie, MovieSchema } from '../src/movies/schemas/movie.schema';

async function importCSV() {
  const results: any[] = [];

  // 1️⃣ Đọc file CSV
  fs.createReadStream('scripts/movies.csv')
    .pipe(csv())
    .on('data', (row) => results.push(row))
    .on('end', async () => {
      console.log(`📦 Read ${results.length} rows`);

      // 2️⃣ Làm sạch dữ liệu
      const cleanData = results.map((row) => {
        const yearMatch = String(row.year).match(/\d{4}/);
        const year = yearMatch ? parseInt(yearMatch[0]) : null;

        const genre = row.genre
          ? row.genre.split(',').map((g) => g.trim())
          : [];

        const duration = row.duration
          ? parseInt(String(row.duration).replace(/[^0-9]/g, ''), 10)
          : null;

        const views = row.votes
          ? parseInt(String(row.votes).replace(/,/g, ''), 10)
          : 0;

        const rating = parseFloat(row.rating) || null;

        const stars = row.stars
          ? row.stars
              .split('|')
              .map((s: string) => s.trim())
              .filter(Boolean)
          : [];

        const poster =
          'https://posterspy.com/wp-content/uploads/2024/10/Doomsday-by-VISCOM.jpg';

        return {
          title: row.title?.trim(),
          year,
          duration,
          genre,
          rating,
          description: row.description || '',
          stars,
          views,
          createdAt: new Date(),
          poster,
        };
      });

      // 3️⃣ Kết nối Mongo
      await mongoose.connect(
        'mongodb+srv://hatchocho02_db_user:apm0C7rNt7cwKeiN@dev.2b69xsb.mongodb.net/?appName=dev',
      );

      const MovieModel: Model<Movie> = mongoose.model<Movie>('Movie', MovieSchema);

      // 4️⃣ Insert
      await MovieModel.insertMany(cleanData);

      console.log(`✅ Imported ${cleanData.length} movies`);

      await mongoose.disconnect();
    });
}

importCSV().catch((err) => console.error('❌ Import failed:', err));
