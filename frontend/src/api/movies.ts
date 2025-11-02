import { apiConfig, getFullUrl } from "./config"
import type { MoviesResponse } from "../types/movie"

export async function fetchMovies(
    page: number,
    limit: number,
    title?: string,
    genre?: string,
    year?: string,
    rating?: string,
    sortBy?: string,
    order?: "asc" | "desc",
): Promise<MoviesResponse> {
    const params = new URLSearchParams()
    params.append("page", page.toString())
    params.append("limit", limit.toString())
    if (title) params.append("title", title)
    if (genre) params.append("genre", genre)
    if (year) params.append("year", year)
    if (rating) params.append("rating", rating)
    if (sortBy) params.append("sortBy", sortBy)
    if (order) params.append("order", order)

    const response = await fetch(getFullUrl(apiConfig.endpoints.movies, params))
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }
    return response.json()
}

export async function fetchGenres(): Promise<string[]> {
    const response = await fetch(getFullUrl(apiConfig.endpoints.genres))
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }
    return response.json()
}
