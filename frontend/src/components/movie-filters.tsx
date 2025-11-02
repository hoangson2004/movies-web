"use client"

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
                             }: MovieFiltersProps) {
    return (
        <div className="mb-8 space-y-6">
            <div>
                <input
                    type="text"
                    placeholder="Search movies by title..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

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
                    {[2024, 2023, 2022, 2021, 2020].map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
