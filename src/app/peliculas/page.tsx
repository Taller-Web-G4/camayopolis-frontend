'use client'

import React, { useState } from 'react';
import { FilterSidebar } from "@/components/peliculas/FilterSidebar";
import { SelectedFilters } from "@/components/peliculas/SelectedFilters";
import { MovieListTitle } from "@/components/shared/MovieListTitle";
import { CategorySelector } from "@/components/home/CategorySelector";
import { MovieList } from "@/components/home/MovieList/MovieList";

export default function Peliculas() {
    const [selectedFilters, setSelectedFilters] = useState<{ name: string; value: string; multiSelect: boolean }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('En cartelera');

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
    const getFiltersForCategory = () => {
        if (selectedCategory === 'En cartelera') {
            return [
                { title: "Ciudad", options: ['Lima', 'Arequipa', 'Cajamarca', 'Chiclayo'], multiSelect: true },
                { title: "Cine", options: ['Cineplanet', 'Cinemark', 'UVK', 'Cinepolis'], multiSelect: false },
                { title: "Día", options: ['Hoy', 'Mañana', 'Fin de semana'], multiSelect: false },
                { title: "Género", options: ['Acción', 'Comedia', 'Drama', 'Terror'], multiSelect: true },
            ];
        } else if (selectedCategory === 'Próximos estrenos') {
            return [
                { title: "Formato", options: ['2D', '3D', 'IMAX'], multiSelect: true },
                { title: "Idioma", options: ['Español', 'Inglés', 'Francés'], multiSelect: true },
                { title: "Censura", options: ['+14', '+18'], multiSelect: false },
            ];
        }
        return [];
    };

    return (
        <main className="p-6 max-w-screen-xl mx-auto">
            {/* Contenedor flex para el título y el selector de categorías */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <MovieListTitle title="Películas" color="text-blue-900" />
                    <CategorySelector
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleSelectCategory}
                    />
                </div>
            </div>

            {/* Contenedor de filtros seleccionados */}
            <SelectedFilters filters={selectedFilters} onRemove={(filterName, filterValue) => handleDeselectFilter(filterName, filterValue)} />

            {/* Contenedor principal con barra lateral de filtros y lista de películas */}
            <div className="flex mt-4 gap-4">
                {/* Barra lateral de filtros dinámica */}
                <div className="w-1/4">
                    <FilterSidebar
                        filters={getFiltersForCategory()}
                        selectedFilters={selectedFilters}
                        onSelectFilter={handleSelectFilter}
                        onDeselectFilter={handleDeselectFilter}
                    />
                </div>

                {/* Contenido de la lista de películas */}
                <div className="w-3/4">
                    <MovieList category={selectedCategory} />
                </div>
            </div>
        </main>
    );
}
