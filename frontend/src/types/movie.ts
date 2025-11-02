export interface Movie {
    id: string
    title: string
    rating: number
    genre: string[]
    year: number
    poster: string
    views: number
    backdrop: string
    description: string
    duration: number
    stars: string[]
}

export interface MovieList {
    data: Movie[]
    total: number
    page: number
    limit: number
    totalPages: number
}
