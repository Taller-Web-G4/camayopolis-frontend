import React, { useMemo } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/ui/movieCard';

interface MovieListProps {
    category: string;
    movies?: any[];
}

export const MovieList: React.FC<MovieListProps> = ({ category, movies = [] }) => {
    const moviesEnCartelera = [
        {
            id: '11',
            title: 'Toy Story',
            posterUrl: '/movies/toystory.jpg',
            releaseDate: '15 de Agosto',
        },
        {
            id: '12',
            title: 'El Padrino',
            posterUrl: '/movies/padrino.jpg',
            releaseDate: '25 de Julio',
        },
        {
            id: '9',
            title: 'Origin',
            posterUrl: '/movies/origin.jpg',
            releaseDate: 'Próximamente',
        },
        {
            id: '10',
            title: 'Matrix',
            posterUrl: '/movies/matrix.jpg',
            releaseDate: '22 de Agosto',
            label: 'Reestreno',
        },
        {
            id: '16',
            title: 'Lluvia Ácida',
            posterUrl: '/movies/5.jpg',
            releaseDate: 'En cartelera',
            label: 'Estreno',
        },
    ];

    const moviesProximosEstrenos = [
        {
            id: '6',
            title: 'Avatar 3',
            posterUrl: '/movies/6.jpg',
            releaseDate: '20 de Diciembre',
        },
        {
            id: '7',
            title: 'Matrix 4',
            posterUrl: '/movies/7.jpg',
            releaseDate: '30 de Noviembre',
        },
        {
            id: '8',
            title: 'El Señor de los Anillos: La Comunidad del Anillo',
            posterUrl: '/movies/8.jpg',
            releaseDate: 'Próximamente',
        },
        {
            id: '9',
            title: 'El Rey León',
            posterUrl: '/movies/9.jpg',
            releaseDate: '5 de Septiembre',
            label: 'Reestreno',
        },
        {
            id: '10',
            title: 'Interstellar',
            posterUrl: '/movies/10.jpg',
            releaseDate: '1 de Octubre',
            label: 'Estreno',
        },
    ];

    const moviesList = useMemo(() => {
        if (movies.length > 0) {
            return movies;
        }
        return category === 'En cartelera' ? moviesEnCartelera : moviesProximosEstrenos;
    }, [category, movies]);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="grid gap-4 grid-cols-1 grid-rows-6 sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
                {moviesList.map((movie) => (
                    <div key={movie.id}>
                        <MovieCard
                            id={movie.id} // Pasar el ID al MovieCard
                            title={movie.title}
                            image={movie.posterUrl}
                            releaseDate={movie.releaseDate}
                            label={movie.label}
                            className="h-full"
                        />
                    </div>
                ))}
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
