// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export const apiConfig = {
    baseURL: API_BASE_URL,
    endpoints: {
        list: '/api/movies',
        genres: '/api/movies/genres',
        details: '/api/movies'
    },
}

export const getFullUrl = (endpoint: string, params?: URLSearchParams): string => {
    const url = `${apiConfig.baseURL}${endpoint}`
    return params ? `${url}?${params.toString()}` : url
}
