import { apiConfig, getFullUrl } from "./config"
import type {Movie, MovieList} from "../types/movie"

export async function fetchList(
    page: number,
    limit: number,
    title?: string,
    genre?: string,
    year?: string,
    rating?: string,
    sortBy?: string,
    order?: "asc" | "desc",
): Promise<MovieList> {
    const params = new URLSearchParams()
    params.append("page", page.toString())
    params.append("limit", limit.toString())
    if (title) params.append("title", title)
    if (genre) params.append("genre", genre)
    if (year) params.append("year", year)
    if (rating) params.append("rating", rating)
    if (sortBy) params.append("sortBy", sortBy)
    if (order) params.append("order", order)

    const response = await fetch(getFullUrl(apiConfig.endpoints.list, params))
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

export async function getMovieById(movieId: string): Promise<Movie> {
    const response = await fetch(getFullUrl(`${apiConfig.endpoints.details}/${movieId}`))
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }
    return response.json()
}