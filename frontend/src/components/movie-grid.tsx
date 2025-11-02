"use client"

import { MovieCard } from "./movie-card"
import type { Movie } from "../types/movie"

interface MovieGridProps {
    movies: Movie[]
    onSelectMovie: (movieId: string) => void
}

export function MovieGrid({ movies, onSelectMovie }: MovieGridProps) {
    if (movies.length === 0) {
        return (
            <div className="flex min-h-96 items-center justify-center rounded-lg border border-border bg-card">
                <p className="text-lg text-muted-foreground">No movies found. Try adjusting your filters.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
                <div key={movie.id} onClick={() => onSelectMovie(movie.id)} className="cursor-pointer">
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    )
}
