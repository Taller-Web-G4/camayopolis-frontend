'use client';

import React, { useState } from 'react';
import { FilterSearchCompact } from "@/components/peliculas/(pelicula)/FilterSearchCompact";
import { CinesList} from "@/components/peliculas/(pelicula)/CinesList";
import {Cinema, Movie} from "@/interfaces";

interface FilterClientProps {
    pelicula: Movie;
}

const FilterClient: React.FC<FilterClientProps> = ({ pelicula }) => {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);


    const matchesFilters = (cine: Cinema) => {
        const matchesCity = !selectedCity || cine.city === selectedCity;
        const matchesCinema = !selectedCinema || cine.cinema === selectedCinema;
        const matchesDate = cine.session.some(session => !selectedDate || session.date === selectedDate);

        return matchesCity && matchesCinema && matchesDate;
    };

    const filteredCines = pelicula.cines
        .filter(matchesFilters)
        .map(cine => ({
            ...cine,
            session: cine.session.filter(session => !selectedDate || session.date === selectedDate),
        }));

    return (
        <>
            <FilterSearchCompact
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedCinema={selectedCinema}
                setSelectedCinema={setSelectedCinema}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                pelicula={pelicula}
            />
            <CinesList cines={filteredCines} />
        </>
    );
};

export default FilterClient;
