'use client'

import React, { useEffect, useState } from 'react';
import { FilterSidebar } from "@/components/peliculas/FilterSidebar";
import { SelectedFilters } from "@/components/peliculas/SelectedFilters";
import { MovieListTitle } from "@/components/shared/MovieListTitle";
import { CategorySelector } from "@/components/home/CategorySelector";
import { MovieList } from "@/components/home/MovieList/MovieList";
import { genderApi } from '@/api/backend/endpoints/gender.api';

export default function Peliculas() {
    const [selectedFilters, setSelectedFilters] = useState<{ name: string; value: string; multiSelect: boolean }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('En cartelera');
    const [filters, setFilters] = useState<any[]>([]);
    const [movies, setMovies] = useState<any[]>([]); // Estado para las películas
    const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false); // Estado para la carga de películas
    const [genres, setGenres] = useState<any[]>([]);

    const handleSelectFilter = (name: string, value: string, multiSelect: boolean) => {
        if (multiSelect) {
            setSelectedFilters((prevFilters) => [
                ...prevFilters,
                { name, value, multiSelect },
            ]);
        } else {
            setSelectedFilters((prevFilters) => [
                ...prevFilters.filter((filter) => filter.name !== name),
                { name, value, multiSelect },
            ]);
        }
    };

    const handleDeselectFilter = (name: string, value: string) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.filter((filter) => !(filter.name === name && filter.value === value))
        );
    };

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setSelectedFilters([]);
    };

    // Definir filtros basados en la categoría seleccionada
    const getFiltersForCategory = async () => {
        if (selectedCategory === 'En cartelera') {
            // Obtener los géneros de la API
            const response = await genderApi.getAll();
            setGenres(response.data);
            const genreOptions = response.data.map((genre) => ({
                id: genre.id,
                name: genre.name,
            }));

            return [
                { title: "Ciudad", options: ['Lima', 'Arequipa', 'Cajamarca', 'Chiclayo'], multiSelect: true },
                { title: "Cine", options: ['Cineplanet', 'Cinemark', 'UVK', 'Cinepolis'], multiSelect: false },
                { title: "Día", options: ['Hoy', 'Mañana', 'Fin de semana'], multiSelect: false },
                { title: "Género", options: genreOptions.map((g) => g.name), multiSelect: false },
            ];
        }
        return [];
    };

    // Cargar los filtros cuando cambia la categoría
    useEffect(() => {
        async function fetchFilters() {
            const filtersData = await getFiltersForCategory();
            setFilters(filtersData);
        }
        fetchFilters();
    }, [selectedCategory]);

    // Cargar las películas cuando se cambia el género seleccionado
    useEffect(() => {
        async function fetchMoviesByGenre() {
            const selectedGenre = selectedFilters.find((filter) => filter.name === 'Género');
            if (!selectedGenre) {
                setMovies([]); // Si no hay género seleccionado, no mostrar películas
                return;
            }
            setIsLoadingMovies(true);
            try {
                const genreId = genres.find((genre) => genre.name === selectedGenre.value)?.id;

                if (genreId) {
                    // Usar el ID del género para obtener las películas
                    const response = await genderApi.getMoviesByGender(genreId);  // Usamos el ID aquí
                    setMovies(response.data);
                }
            } catch (error) {
                console.error('Error fetching movies by genre:', error);
            } finally {
                setIsLoadingMovies(false);
            }
        }
        fetchMoviesByGenre();
    }, [selectedFilters, filters]);

    return (
        <main className="p-6 max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <MovieListTitle title="Películas" color="text-blue-900" />
                    <CategorySelector
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleSelectCategory}
                    />
                </div>
            </div>

            <SelectedFilters filters={selectedFilters} onRemove={(filterName, filterValue) => handleDeselectFilter(filterName, filterValue)} />

            <div className="flex mt-4 gap-4">
                <div className="w-1/4">
                    <FilterSidebar
                        filters={filters}
                        selectedFilters={selectedFilters}
                        onSelectFilter={handleSelectFilter}
                        onDeselectFilter={handleDeselectFilter}
                    />
                </div>

                <div className="w-3/4">
                    {isLoadingMovies ? (
                        <p>Cargando películas...</p>
                    ) : (
                        <MovieList category={selectedCategory} movies={movies} />
                    )}
                </div>
            </div>
        </main>
    );
}
