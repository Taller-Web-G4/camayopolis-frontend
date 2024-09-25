'use client'

import React, { useMemo } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/ui/movieCard';

interface MovieListProps {
    category: string;
}

export const MovieList: React.FC<MovieListProps> = ({ category }) => {
    const moviesEnCartelera = [
        {
            title: 'Alien: Romulus',
            image: 'movies/1.jpg',
            releaseDate: '15 de Agosto',
        },
        {
            title: 'Deadpool 3',
            image: 'movies/2.jpg',
            releaseDate: '25 de Julio',
        },
        {
            title: 'Romper el Círculo',
            image: 'movies/3.jpg',
            releaseDate: 'Próximamente',
        },
        {
            title: 'Shrek 2',
            image: 'movies/4.jpg',
            releaseDate: '22 de Agosto',
            label: 'Reestreno',
        },
        {
            title: 'Lluvia Ácida',
            image: 'movies/5.jpg',
            releaseDate: 'En cartelera',
            label: 'Estreno',
        },
    ];

    const moviesProximosEstrenos = [
        {
            title: 'Avatar 3',
            image: 'movies/6.jpg',
            releaseDate: '20 de Diciembre',
        },
        {
            title: 'Matrix 4',
            image: 'movies/7.jpg',
            releaseDate: '30 de Noviembre',
        },
        {
            title: 'El Señor de los Anillos: La Comunidad del Anillo',
            image: 'movies/8.jpg',
            releaseDate: 'Próximamente',
        },
        {
            title: 'El Rey León',
            image: 'movies/9.jpg',
            releaseDate: '5 de Septiembre',
            label: 'Reestreno',
        },
        {
            title: 'Interstellar',
            image: 'movies/10.jpg',
            releaseDate: '1 de Octubre',
            label: 'Estreno',
        },
    ];

    const movies = useMemo(() => {
        return category === 'En cartelera' ? moviesEnCartelera : moviesProximosEstrenos;
    }, [category]);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="grid gap-4
        grid-cols-1 grid-rows-6
        sm:grid-cols-2 sm:grid-rows-4
        lg:grid-cols-3 lg:grid-rows-3">

                <div className="lg:col-span-2 lg:row-span-2">
                    <MovieCard
                        title={movies[0].title}
                        image={movies[0].image}
                        releaseDate={movies[0].releaseDate}
                        label={movies[0].label}
                        className="h-full"
                    />
                </div>
                <div className="lg:col-start-1 lg:row-start-3">
                    <MovieCard
                        title={movies[1].title}
                        image={movies[1].image}
                        releaseDate={movies[1].releaseDate}
                        label={movies[1].label}
                        className="h-full"
                    />
                </div>
                <div className="lg:col-start-2 lg:row-start-3">
                    <MovieCard
                        title={movies[2].title}
                        image={movies[2].image}
                        releaseDate={movies[2].releaseDate}
                        label={movies[2].label}
                        className="h-full"
                    />
                </div>
                <div className="lg:col-start-3 lg:row-start-1">
                    <MovieCard
                        title={movies[3].title}
                        image={movies[3].image}
                        releaseDate={movies[3].releaseDate}
                        label={movies[3].label}
                        className="h-full"
                    />
                </div>
                <div className="lg:col-start-3 lg:row-start-2">
                    <MovieCard
                        title={movies[4].title}
                        image={movies[4].image}
                        releaseDate={movies[4].releaseDate}
                        label={movies[4].label}
                        className="h-full"
                    />
                </div>
                <div className="lg:row-start-3">
                    <Link href="/peliculas" className="relative flex flex-col items-center justify-center bg-red-700 text-white font-bold rounded-md h-full transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-red-900 overflow-hidden text-3xl">
                        <span
                            className="absolute inset-0 flex items-center justify-center text-[32rem] text-white opacity-10">
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

