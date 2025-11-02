"use client"

import { ArrowLeft, Star, Clock, Users } from "lucide-react"
import { useState, useEffect } from "react"
import type { Movie } from "../types/movie"
import { RecommendedMovies } from "../components/recommened-movies.tsx"
import {getMovieById} from "../api/movies.ts";

interface MovieDetailPageProps {
    movieId: string
    onBack: () => void
}

export function MovieDetailPage({ movieId, onBack }: MovieDetailPageProps) {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovie = async (movieId: string) => {
            try {
                setLoading(true)
                const data = await getMovieById(movieId)
                setMovie(data)
            } catch (err) {
                console.error("[v0] Error fetching movie:", err)
            } finally {
                setLoading(false)
            }
        }

        if (movieId) {
            fetchMovie(movieId)
        }
    }, [movieId])

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </main>
        )
    }

    if (!movie) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-red-500 mb-4">Movie not found</p>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Back to Movies
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
            {/* Back Button */}
            <div className="sticky top-0 z-50 bg-gradient-to-b from-slate-900 to-transparent px-4 py-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Movies
                </button>
            </div>

            {/* Backdrop Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                    src={movie.backdrop || "/placeholder.svg?height=500&width=1920&query=movie backdrop"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950"></div>
            </div>

            {/* Main Content */}
            <div className="relative -mt-32 md:-mt-40 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Poster */}
                    <div className="flex-shrink-0 w-48 md:w-64">
                        <img
                            src={movie.poster || "/placeholder.svg?height=400&width=300&query=movie poster"}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Title and Main Info */}
                    <div className="flex-1 pt-4 md:pt-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{movie.title}</h1>

                        <div className="flex flex-wrap gap-6 mb-8">
                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <Star className="h-6 w-6 fill-orange-500 text-orange-500" />
                                <span className="text-2xl font-semibold">{movie.rating ? movie.rating.toFixed(1) : "N/A"}</span>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6 text-orange-500" />
                                <span className="text-lg">{movie.duration ? `${movie.duration} mins` : "N/A"}</span>
                            </div>

                            {/* Views */}
                            <div className="flex items-center gap-2">
                                <Users className="h-6 w-6 text-orange-500" />
                                <span className="text-lg">{movie.views.toLocaleString()} views</span>
                            </div>
                        </div>

                        {/* Genres */}
                        <div className="mb-8">
                            <p className="text-sm text-slate-400 mb-2">Genres</p>
                            <div className="flex flex-wrap gap-2">
                                {movie.genre.slice(0, 5).map((g) => (
                                    <span key={g} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                    {g}
                  </span>
                                ))}
                            </div>
                        </div>

                        {/* Year */}
                        <div className="text-sm text-slate-400">
                            <span>Released: </span>
                            <span className="text-white font-medium">{movie.year}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-12 max-w-3xl">
                    <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                    <p className="text-slate-300 leading-relaxed text-lg">{movie.description}</p>
                </div>

                {/* Cast */}
                {movie.stars && movie.stars.length > 0 && (
                    <div className="mt-12 max-w-3xl">
                        <h2 className="text-2xl font-bold mb-4">Cast</h2>
                        <div className="flex flex-wrap gap-3">
                            {movie.stars.map((star) => (
                                <span key={star} className="px-4 py-2 bg-slate-800 rounded-lg text-slate-200">
                  {star}
                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommended Movies Placeholder */}
                <div className="mt-16">
                    <RecommendedMovies movieId={movieId} />
                </div>
            </div>
        </main>
    )
}
