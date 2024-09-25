'use client'

import React from 'react';
import Image from 'next/image'; // Importa el componente Image de Next.js

interface MovieCardProps {
    title: string;
    image: string;
    releaseDate: string;
    label?: string;
    className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, releaseDate, label, className }) => {
    return (
        <div className={`relative overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:scale-[1.025] ${className}`}>
            {/* Contenedor de la imagen con posición relativa y proporción de aspecto */}
            <div className="relative w-full aspect-[2/3]"> {/* Establecer la relación de aspecto 2:3 para las imágenes */}
                <Image
                    src={`/${image}`} // Asegúrate de que las imágenes estén en la carpeta 'public'
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimización para diferentes tamaños de pantalla
                />
            </div>

            {/* Etiqueta de película */}
            {label && (
                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {label}
                </span>
            )}

            {/* Información de la película en la parte inferior */}
            <div className="absolute bottom-0 left-0 z-10 p-2 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="text-xs">{releaseDate}</p>
            </div>

            {/* Contenedor de los botones, oculto inicialmente y visible al hacer hover */}
            <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                <button className="w-3/4 sm:w-auto flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-2 px-4 mx-2 my-1 sm:my-0 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m4 8H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v7" />
                    </svg>
                    Comprar
                </button>
                <button className="w-3/4 sm:w-auto flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold py-2 px-4 mx-2 my-1 sm:my-0 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Ver Detalles
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
