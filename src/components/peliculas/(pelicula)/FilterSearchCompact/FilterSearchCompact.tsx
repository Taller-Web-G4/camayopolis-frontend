'use client';

import React, { useEffect, useState } from 'react';
import SelfSelector from '@/components/ui/selfSelector';

interface FilterSearchCompactProps {
    selectedCity: string | null;
    setSelectedCity: (city: string | null) => void;
    selectedCinema: string | null;
    setSelectedCinema: (cinema: string | null) => void;
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
    pelicula?: {
        id: number;
        title: string;
        cines: {
            cinema: string;
            city: string;
            session: {
                format: string;
                type: string;
                language: string;
                schedules: string[];
                date: string;
            }[];
        }[];
    };
}

export const FilterSearchCompact: React.FC<FilterSearchCompactProps> = ({
                                                                            selectedCity,
                                                                            setSelectedCity,
                                                                            selectedCinema,
                                                                            setSelectedCinema,
                                                                            selectedDate,
                                                                            setSelectedDate,
                                                                            pelicula,
                                                                        }) => {
    const [cities, setCities] = useState<string[]>([]);
    const [cinemas, setCinemas] = useState<string[]>([]);
    const [dates, setDates] = useState<string[]>([]);

    useEffect(() => {
        if (pelicula) {
            setCities(Array.from(new Set(pelicula.cines.map((cine) => cine.city))));  // Cambio de ciudad a city
            setCinemas(Array.from(new Set(pelicula.cines.map((cine) => cine.cinema))));  // Cambio de cine a cinema
            setDates(
                Array.from(
                    new Set(
                        pelicula.cines.flatMap((cine) =>
                            cine.session.map((funcion) => funcion.date)  // Cambio de funciones a session y fecha a date
                        )
                    )
                )
            );
        }
    }, [pelicula]);

    useEffect(() => {
        if (pelicula) {
            const uniqueCities = new Set<string>();
            const uniqueCinemas = new Set<string>();
            const uniqueDates = new Set<string>();

            pelicula.cines.forEach(cine => {
                cine.session.forEach(session => {
                    if (!selectedCity || cine.city === selectedCity) {
                        uniqueCities.add(cine.city);
                    }
                    if (!selectedCinema || cine.cinema === selectedCinema) {
                        uniqueCinemas.add(cine.cinema);
                    }
                    if (!selectedDate || session.date === selectedDate) {
                        uniqueDates.add(session.date);
                    }
                });
            });

            setCities(Array.from(uniqueCities));
            setCinemas(Array.from(uniqueCinemas));
            setDates(Array.from(uniqueDates));
        }
    }, [pelicula, selectedCity, selectedCinema, selectedDate]);

    if (!pelicula) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`max-w-max mx-auto bg-white shadow-2xl border border-gray-300 my-4`}>
            <div className={`grid grid-cols-3 grid-rows-1 gap-4 items-center`}>
                <div className="p-6">
                    <SelfSelector
                        label="Por ciudad"
                        description="Dónde estás"
                        options={cities}
                        selectedOption={selectedCity}
                        onSelect={(value) => {
                            setSelectedCity(value);
                            setSelectedCinema(null);
                            setSelectedDate(null);
                        }}
                        onClear={() => {
                            setSelectedCity(null);
                            setSelectedCinema(null);
                            setSelectedDate(null);
                        }}
                    />
                </div>

                <div className="border-l border-gray-300 p-6">
                    <SelfSelector
                        label="Por cine"
                        description="Elige tu Cine"
                        options={cinemas}
                        selectedOption={selectedCinema}
                        onSelect={(value) => {
                            setSelectedCinema(value);
                            setSelectedDate(null);
                        }}
                        onClear={() => {
                            setSelectedCinema(null);
                            setSelectedCity(null);
                            setSelectedDate(null);
                        }}
                    />
                </div>

                <div className="border-l border-gray-300 p-6">
                    <SelfSelector
                        label="Por fecha"
                        description="Elige un día"
                        options={dates}
                        selectedOption={selectedDate}
                        onSelect={(value) => {
                            setSelectedDate(value);
                            setSelectedCity(null);
                            setSelectedCinema(null);
                        }}
                        onClear={() => setSelectedDate(null)}
                    />
                </div>
            </div>
        </div>
    );
};
