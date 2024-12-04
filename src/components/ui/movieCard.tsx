import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
    id: string; // Nuevo prop para el ID de la película
    title: string;
    image: string;
    releaseDate: string;
    label?: string;
    className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, image, releaseDate, label, className }) => {
    return (
        <div className={`relative overflow-hidden rounded-md shadow-md transition-transform duration-300 hover:scale-[1.025] ${className}`}>
            <div className="relative w-full aspect-[2/3]">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {label && (
                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {label}
                </span>
            )}

            <div className="absolute bottom-0 left-0 z-10 p-2 bg-gradient-to-t from-black to-transparent text-white">
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="text-xs">{releaseDate}</p>
            </div>

            <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                <button className="w-3/4 sm:w-auto flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-2 px-4 mx-2 my-1 sm:my-0 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                    Comprar
                </button>
                <Link href={`/peliculas/${id}`} passHref>
                    <button className="w-3/4 sm:w-auto flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold py-2 px-4 mx-2 my-1 sm:my-0 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Ver Detalles
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
