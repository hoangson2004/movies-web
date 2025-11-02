import { Star } from "lucide-react"
import type { Movie } from "../types/movie"

interface MovieCardProps {
    movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
    const displayGenres = Array.isArray(movie.genre) ? movie.genre.slice(0, 1) : []

    return (
        <div className="group cursor-pointer overflow-hidden rounded-lg bg-card transition-all hover:shadow-xl hover:shadow-primary/20">
            <div className="relative overflow-hidden bg-muted">
                <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="p-4">
                <h3 className="line-clamp-2 text-base font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {movie.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">{movie.rating}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        {displayGenres.map((g, idx) => (
                            <span key={idx} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {g}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{movie.year}</p>
                    <p className="text-xs text-muted-foreground">{movie.views?.toLocaleString()} views</p>
                </div>
            </div>
        </div>
    )
}
