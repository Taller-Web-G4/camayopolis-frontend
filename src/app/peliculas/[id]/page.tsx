import React from 'react';
import { notFound } from 'next/navigation';
import { MovieCardInfo } from "@/components/peliculas/(pelicula)/MoveCardInfo";
import { Movie } from '@/interfaces';
import { movieApi } from "@/api/backend";
import FilterClient from '@/components/peliculas/(pelicula)/FilterClient';

export default async function PeliculaPage({ params }: { params: { id: string } }) {
    const { id } = params;

    let pelicula: Movie | null = null;
    try {
        const response = await movieApi.getMovieDetailed(Number(id));
        pelicula = response.data;
    } catch (error) {
        console.error("Error obteniendo los datos de la película: ", error);
        return notFound();
    }

    if (!pelicula) {
        return notFound();
    }

    return (
        <main>
            <div className="container mx-auto p-9">
                <MovieCardInfo movie={pelicula} />
            </div>

            <FilterClient pelicula={pelicula} />
        </main>
    );
}
