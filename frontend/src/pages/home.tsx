"use client"

import { useState, useEffect } from "react"
import { MovieGrid } from "../components/movie-grid"
import { MovieFilters } from "../components/movie-filters"
import { Header } from "../components/header"
import type { Movie } from "../types/movie"
import { fetchList, fetchGenres } from "../api/movies"

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
    const [selectedSortBy, setSelectedSortBy] = useState<string>("")
    const [selectedOrder, setSelectedOrder] = useState<"asc" | "desc">("desc")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [genres, setGenres] = useState<string[]>([])

    const handleSearch = async () => {
        try {
            setLoading(true)
            const data = await fetchList(
                page,
                16,
                searchQuery,
                selectedGenre,
                selectedYear,
                selectedRating,
                selectedSortBy || undefined,
                selectedOrder,
            )
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

    useEffect(() => {
        handleSearch()
    }, [page])

    useEffect(() => {
        const fetchGenresList = async () => {
            try {
                const data = await fetchGenres()
                setGenres(data)
            } catch (err) {
                console.error("[v0] Error fetching genres:", err)
            }
        }

        fetchGenresList()
    }, [])

    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative h-12 w-12">
                        <div className="absolute inset-0 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
                    </div>
                    <p className="text-lg text-muted-foreground">Loading movies...</p>
                </div>
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
                    onSearchChange={setSearchQuery}
                    selectedYear={selectedYear}
                    onYearChange={setSelectedYear}
                    selectedSortBy={selectedSortBy}
                    onSortByChange={setSelectedSortBy}
                    selectedOrder={selectedOrder}
                    onOrderChange={setSelectedOrder}
                    onSearch={() => {
                        setPage(1)
                        handleSearch()
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
