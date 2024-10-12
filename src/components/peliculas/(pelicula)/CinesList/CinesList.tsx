'use client';

import React, { FC } from 'react';
import { CineDropdown } from "@/components/peliculas/(pelicula)/CineDropdown";

interface CinesListProps {
    cines: {
        cinema: string;
        session: {
            format: string;
            type: string;
            language: string;
            schedules: string[];
            date: string;
        }[];
    }[];
}

export const CinesList: FC<CinesListProps> = ({ cines }) => {
    return (
        <div className="max-w-screen-md mx-auto bg-white shadow-md rounded-md my-8 p-4">
            {cines.length > 0 ? (
                cines.map((cineData, index) => (
                    <CineDropdown
                        key={index}
                        cine={cineData.cinema}
                        funciones={cineData.session}
                    />
                ))
            ) : (
                <div className="text-center text-gray-600">No se encontraron cines para los filtros seleccionados.</div>
            )}
        </div>
    );
};
