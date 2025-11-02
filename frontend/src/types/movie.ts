export interface Movie {
    id: string
    title: string
    rating: number
    genre: string
    year: number
    poster: string
    description: string
    fileName: string
}

export interface MoviesResponse {
    data: Movie[]
    total: number
    page: number
    limit: number
    totalPages: number
}
