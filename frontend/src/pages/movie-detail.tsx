"use client"

import { ArrowLeft } from  "lucide-react"
import { Star } from "lucide-react"
import { useState, useEffect } from "react";
import type { Movie } from "../types/movie"

interface MovieDetailPageProps {
    movieId: string;
    onBack: () => void;
}

export function MovieDetailPage({ movieId, onBack }: MovieDetailPageProps) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/stream/${movieId}`)

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`)
                }

                const data: Movie = await response.json();
                setMovie(data);
            } catch (err) {
                console.error("[v0] Error fetching movie:", err)
            } finally {
                setLoading(false);
            }
        }

        fetchMovie()
    }, [movieId])

    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <p className="text-lg">Loading movie details...</p>
            </main>
        )
    }

    if (!movie) {
        if (!movie) {
            return (
                <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg text-red-500">Movie not found</p>
                    </div>
                </main>
            )
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-4xl px-4 py-8">
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Back to Movies
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <img src={movie.poster || "/placeholder.svg"} alt={movie.title} className="w-full rounded-lg shadow-lg" />
                    </div>

                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

                        <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center gap-2">
                                <Star className="h-6 w-6 fill-accent text-accent" />
                                <span className="text-2xl font-semibold">{movie.rating}</span>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Genre</p>
                                <p className="text-lg font-medium">{movie.genre}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Year</p>
                                <p className="text-lg font-medium">{movie.year}</p>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                This movie detail page can be extended with more information like synopsis, cast, director, runtime,
                                etc.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}