"use client"

import { useState } from "react"
import { HomePage } from "./pages/home";
import { MovieDetailPage } from "./pages/movie-detail"

export default function App() {
    const [currentPage, setCurrentPage] = useState<"home" | "detail">("home");
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

    const handleSelectMovie = (movieId: string) => {
        setSelectedMovieId(movieId);
        setCurrentPage("detail");
    }

    const handleBackToHome = () => {
        setCurrentPage("home");
        setSelectedMovieId(null);
    }

    return (
        <>
            {currentPage === "home" && <HomePage onSelectMovie={handleSelectMovie} />}
            {currentPage === "detail" && selectedMovieId && (
                <MovieDetailPage movieId={selectedMovieId} onBack={handleBackToHome} />
            )}
        </>
    )
}
