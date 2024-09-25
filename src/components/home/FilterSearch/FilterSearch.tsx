'use client'

import React, { useState } from 'react';
import SelfSelector from '@/components/ui/selfSelector';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export const FilterSearch = () => {
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const movies: string[] = ['La Forja', 'Pelicula 2', 'Pelicula 3'];
    const cities: string[] = ['Lima', 'Ciudad 2', 'Ciudad 3'];
    const cinemas: string[] = ['Cine Centro', 'Cine 2', 'Cine 3'];
    const dates: string[] = ['Lunes', 'Martes', 'Miércoles'];

    const isAnyFilterSelected: string | null = selectedMovie || selectedCity || selectedCinema || selectedDate;

    return (
        <div className="max-w-max mx-auto bg-white shadow-2xl flex items-center border border-gray-300 my-4 grid md:grid-cols-5 md:grid-rows-1 grid-cols-2 grid-rows-3">
            <div className="p-6">
                <SelfSelector
                    label="Por película"
                    description="Qué quieres ver"
                    options={movies}
                    selectedOption={selectedMovie}
                    onSelect={setSelectedMovie}
                    onClear={() => setSelectedMovie(null)}
                />
            </div>

            <div className="border-l border-gray-300 p-6">
                <SelfSelector
                    label="Por ciudad"
                    description="Dónde estás"
                    options={cities}
                    selectedOption={selectedCity}
                    onSelect={setSelectedCity}
                    onClear={() => setSelectedCity(null)}
                />
            </div>
            <div className="border-l border-gray-300 p-6">
                <SelfSelector
                    label="Por cine"
                    description="Elige tu Cine"
                    options={cinemas}
                    selectedOption={selectedCinema}
                    onSelect={setSelectedCinema}
                    onClear={() => setSelectedCinema(null)}
                />
            </div>

            <div className="border-l border-gray-300 p-6">
                <SelfSelector
                    label="Por fecha"
                    description="Elige un día"
                    options={dates}
                    selectedOption={selectedDate}
                    onSelect={setSelectedDate}
                    onClear={() => setSelectedDate(null)}
                />
            </div>
            <div className="p-6 col-span-2 flex justify-center md:col-span-1 sm:col-span-2 sm:border-t sm:border-gray-300 md:border-0">
                <Button
                    className={`flex items-center space-x-2 font-medium rounded-full px-4 py-2 shadow-lg transition-colors duration-200 ${
                        isAnyFilterSelected
                            ? 'bg-blue-800 text-white hover:bg-blue-700'
                            : 'bg-gray-400 text-gray-800 cursor-not-allowed'
                    }`}
                    disabled={!isAnyFilterSelected}
                >
                    <Filter size={16} className={isAnyFilterSelected ? 'text-white' : 'text-gray-800'}/>
                    <span>Filtrar</span>
                </Button>
            </div>
        </div>
    );
};