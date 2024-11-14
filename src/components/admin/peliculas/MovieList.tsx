'use client';

import { useEffect, useState } from 'react';
import { MovieDetails } from '@/interfaces/models/movieDetails.interface';
import { movieApi } from '@/api/backend';
import { Button } from '@/components/ui/button';
import { MovieDialog } from './MovieDialog';
import { DataTable } from "@/components/ui/table/DataTable";
import { MovieListTitle } from "@/components/shared/MovieListTitle";

export const MovieList = () => {
    const [movies, setMovies] = useState<MovieDetails[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchMovies = async () => {
        const response = await movieApi.getAll();
        setMovies(response.data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleCreate = () => {
        setSelectedMovie(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (movie: MovieDetails) => {
        setSelectedMovie(movie);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: number) => {
        await movieApi.delete(id);
        fetchMovies();  // Actualiza la lista después de eliminar
    };

    return (
        <div className="mx-60 mt-10">
            <div className="flex justify-between mb-4">
                <MovieListTitle title="Películas" color="text-gray-700" />
                <Button onClick={handleCreate} size="extraLarge">
                    Crear Película
                </Button>
            </div>
            <DataTable data={movies} onEdit={handleEdit} onDelete={handleDelete} />
            <MovieDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={() => {
                    setIsDialogOpen(false);
                    fetchMovies();  // Refresca la lista después de guardar
                }}
                movie={selectedMovie}
            />
        </div>
    );
};
