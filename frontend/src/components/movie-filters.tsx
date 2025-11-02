"use client"

import { useState } from "react"
import type React from "react"

interface MovieFiltersProps {
    genres: string[]
    selectedGenre: string
    onGenreChange: (genre: string) => void
    selectedRating: string
    onRatingChange: (rating: string) => void
    searchQuery: string
    onSearchChange: (query: string) => void
    selectedYear: string
    onYearChange: (year: string) => void
    selectedSortBy: string
    onSortByChange: (sortBy: string) => void
    selectedOrder: "asc" | "desc"
    onOrderChange: (order: "asc" | "desc") => void
    onSearch: () => void
}

export function MovieFilters({
                                 genres,
                                 selectedGenre,
                                 onGenreChange,
                                 selectedRating,
                                 onRatingChange,
                                 searchQuery,
                                 onSearchChange,
                                 selectedYear,
                                 onYearChange,
                                 selectedSortBy,
                                 onSortByChange,
                                 selectedOrder,
                                 onOrderChange,
                                 onSearch,
                             }: MovieFiltersProps) {
    const [showFilters, setShowFilters] = useState(false)

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch()
        }
    }

    return (
        <div className="mb-8 space-y-4">
            {/* Search bar with filter button */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Search movies by title..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="flex-1 rounded-md border border-input bg-card px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                    onClick={onSearch}
                    className="rounded-md bg-ring text-card px-6 py-2 font-medium hover:opacity-90 transition-opacity"
                >
                    Search
                </button>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="rounded-md border border-input bg-card px-4 py-2 text-foreground hover:bg-muted transition-colors"
                    title="Toggle filters"
                >
                    ⚙️ Filter
                </button>
            </div>

            {/* Filter fields - only shown when filter button is clicked */}
            {showFilters && (
                <div className="space-y-4 pt-4 border-t border-border">
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Genre</h3>
                        <select
                            value={selectedGenre}
                            onChange={(e) => onGenreChange(e.target.value)}
                            className="w-full rounded-md border border-input bg-card px-4 py-2 text-foreground"
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Minimum Rating</h3>
                        <select
                            value={selectedRating}
                            onChange={(e) => onRatingChange(e.target.value)}
                            className="w-full rounded-md border border-input bg-card px-4 py-2 text-foreground"
                        >
                            <option value="">All Ratings</option>
                            <option value="7">7+</option>
                            <option value="7.5">7.5+</option>
                            <option value="8">8+</option>
                            <option value="8.5">8.5+</option>
                        </select>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Year</h3>
                        <select
                            value={selectedYear}
                            onChange={(e) => onYearChange(e.target.value)}
                            className="w-full rounded-md border border-input bg-card px-4 py-2 text-foreground"
                        >
                            <option value="">All Years</option>
                            {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Sort By</h3>
                        <select
                            value={selectedSortBy}
                            onChange={(e) => onSortByChange(e.target.value)}
                            className="w-full rounded-md border border-input bg-card px-4 py-2 text-foreground"
                        >
                            <option value="">Default</option>
                            <option value="title">Title</option>
                            <option value="rating">Rating</option>
                            <option value="year">Year</option>
                            <option value="views">Views</option>
                        </select>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Order</h3>
                        <select
                            value={selectedOrder}
                            onChange={(e) => onOrderChange(e.target.value as "asc" | "desc")}
                            className="w-full rounded-md border border-input bg-card px-4 py-2 text-foreground"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
}
