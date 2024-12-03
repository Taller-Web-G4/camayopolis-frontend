'use client'

import React, { useMemo } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/ui/movieCard';

interface MovieListProps {
    category: string;
    movies?: any[];
}

export const MovieList: React.FC<MovieListProps> = ({ category, movies = [] }) => {
    // Películas predeterminadas
    const moviesEnCartelera = [
        {
            title: 'Alien: Romulus',
            posterUrl: '/movies/1.jpg',
            releaseDate: '15 de Agosto',
        },
        {
            title: 'Deadpool 3',
            posterUrl: '/movies/2.jpg',
            releaseDate: '25 de Julio',
        },
        {
            title: 'Romper el Círculo',
            posterUrl: '/movies/3.jpg',
            releaseDate: 'Próximamente',
        },
        {
            title: 'Shrek 2',
            posterUrl: '/movies/4.jpg',
            releaseDate: '22 de Agosto',
            label: 'Reestreno',
        },
        {
            title: 'Lluvia Ácida',
            posterUrl: '/movies/5.jpg',
            releaseDate: 'En cartelera',
            label: 'Estreno',
        },
    ];

    const moviesProximosEstrenos = [
        {
            title: 'Avatar 3',
            posterUrl: '/movies/6.jpg',
            releaseDate: '20 de Diciembre',
        },
        {
            title: 'Matrix 4',
            posterUrl: '/movies/7.jpg',
            releaseDate: '30 de Noviembre',
        },
        {
            title: 'El Señor de los Anillos: La Comunidad del Anillo',
            posterUrl: '/movies/8.jpg',
            releaseDate: 'Próximamente',
        },
        {
            title: 'El Rey León',
            posterUrl: '/movies/9.jpg',
            releaseDate: '5 de Septiembre',
            label: 'Reestreno',
        },
        {
            title: 'Interstellar',
            posterUrl: '/movies/10.jpg',
            releaseDate: '1 de Octubre',
            label: 'Estreno',
        },
    ];

    const moviesList = useMemo(() => {
        if (movies.length > 0) {
            return movies; // Si se pasan películas dinámicamente, las usamos
        }
        // Si no se pasan películas, usamos las predeterminadas
        return category === 'En cartelera' ? moviesEnCartelera : moviesProximosEstrenos;
    }, [category, movies]);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="grid gap-4 grid-cols-1 grid-rows-6 sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
                {/* Renderiza las tarjetas de película dinámicamente */}
                {moviesList.map((movie, index) => (
                    <div key={index} className={`lg:col-start-${(index % 3) + 1} lg:row-start-${Math.floor(index / 3) + 1}`}>
                        <MovieCard
                            title={movie.title}
                            image={movie.posterUrl}
                            releaseDate={movie.releaseDate}
                            label={movie.label}
                            className="h-full"
                        />
                    </div>
                ))}
                
                {/* Tarjeta "Ver Más" colocada al final, dentro de la misma cuadrícula */}
                <div className="lg:col-span-1 lg:row-span-1">
                    <Link href="/peliculas" className="relative flex flex-col items-center justify-center bg-red-700 text-white font-bold rounded-md h-full transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-red-900 overflow-hidden text-3xl">
                        <span className="absolute inset-0 flex items-center justify-center text-[32rem] text-white opacity-10">
                            +
                        </span>
                        <span className="z-10">Ver Más</span>
                        <span className="z-10">Películas</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
