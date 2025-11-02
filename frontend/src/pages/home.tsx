"use client"

import { useState, useEffect } from "react"
import { MovieGrid } from "../components/movie-grid"
import { MovieFilters } from "../components/movie-filters"
import { Header } from "../components/header"
import type { Movie, MoviesResponse } from "../types/movie"

interface HomePageProps {
    onSelectMovie: (movieId: string) => void
}

export function HomePage({ onSelectMovie }: HomePageProps) {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedGenre, setSelectedGenre] = useState<string>("")
    const [selectedRating, setSelectedRating] = useState<string>("")
    const [selectedYear, setSelectedYear] = useState<string>("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const params = new URLSearchParams()
                params.append("page", page.toString())
                params.append("limit", "10")
                if (searchQuery) params.append("title", searchQuery)
                if (selectedGenre) params.append("genre", selectedGenre)
                if (selectedYear) params.append("year", selectedYear)
                if (selectedRating) params.append("rating", selectedRating)

                const response = await fetch(`http://localhost:3000/movies?${params.toString()}`)

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`)
                }

                const data: MoviesResponse = await response.json()
                setMovies(data.data)
                setTotalPages(data.totalPages)
                setError(null)
            } catch (err) {
                console.error("[v0] Error fetching movies:", err)
                setError(err instanceof Error ? err.message : "Failed to fetch movies")
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [searchQuery, selectedGenre, selectedRating, selectedYear, page])

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies/genres")
                if (response.ok) {
                    const data = await response.json()
                    setGenres(data)
                }
            } catch (err) {
                console.error("[v0] Error fetching genres:", err)
            }
        }

        fetchGenres()
    }, [])

    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <p className="text-lg">Loading movies...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-red-500 mb-4">Error loading movies</p>
                    <p className="text-sm text-muted-foreground">{error}</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="mx-auto max-w-7xl px-4 py-12">
                <MovieFilters
                    genres={genres}
                    selectedGenre={selectedGenre}
                    onGenreChange={setSelectedGenre}
                    selectedRating={selectedRating}
                    onRatingChange={setSelectedRating}
                    searchQuery={searchQuery}
                    onSearchChange={(q) => {
                        setSearchQuery(q)
                        setPage(1)
                    }}
                    selectedYear={selectedYear}
                    onYearChange={(y) => {
                        setSelectedYear(y)
                        setPage(1)
                    }}
                />
                <MovieGrid movies={movies} onSelectMovie={onSelectMovie} />

                <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="rounded-md border border-border px-4 py-2 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="rounded-md border border-border px-4 py-2 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
    )
}
