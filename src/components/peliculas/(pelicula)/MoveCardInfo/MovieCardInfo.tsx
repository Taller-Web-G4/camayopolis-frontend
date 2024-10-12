'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Movie } from '@/interfaces';

interface MovieCardInfoProps {
    movie?: Movie;
}

export const MovieCardInfo: FC<MovieCardInfoProps> = ({ movie }) => {
    if (!movie) {
        return <div>No hay información disponible para esta película.</div>;
    }

    const { title, synopsis, runtime, posterUrl, isComingSoon, isNewRelease, isPreSale, cines } = movie;

    const availableLanguages = Array.from(new Set(cines.flatMap(cine => cine.session.map(session => session.language))));
    const availableFormats = Array.from(new Set(cines.flatMap(cine => cine.session.map(session => session.format))));

    return (
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="w-full md:w-1/3 flex-shrink-0">
                <Card className="w-full">
                    <Image
                        src={posterUrl}
                        alt={title}
                        width={256}
                        height={384}
                        className="rounded-md w-full h-auto object-cover"
                    />
                </Card>
            </div>
            {/* Detalles de la Película */}
            <div className="w-full md:w-2/3">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">
                            {title} {isNewRelease && <span className="text-red-600">(Estreno)</span>}
                        </CardTitle>
                        <div className="text-gray-600 text-md mt-2">
                            {Math.floor(runtime / 60)}h {runtime % 60}min
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        {/* Sinopsis */}
                        <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
                        <p className="text-gray-700 mb-4">{synopsis}</p>
                        {/* Idiomas Disponibles */}
                        <h2 className="text-lg font-semibold mb-2">Idiomas Disponibles</h2>
                        <div className="flex gap-2 mb-4">
                            {availableLanguages.length > 0 ? (
                                availableLanguages.map((language, index) => (
                                    <Badge key={index}>{language.toUpperCase()}</Badge>
                                ))
                            ) : (
                                <span>No disponible</span>
                            )}
                        </div>
                        {/* Formatos Disponibles */}
                        <h2 className="text-lg font-semibold mb-2">Formatos Disponibles</h2>
                        <div className="text-gray-700 mb-4">
                            {availableFormats.length > 0 ? (
                                availableFormats.join(', ')
                            ) : (
                                <span>No disponible</span>
                            )}
                        </div>
                        {/* Botón de compra de boletos */}
                        {(isComingSoon || isPreSale) && (
                            <div className="mb-4">
                                {isComingSoon && <Badge className="bg-yellow-400 text-black">Próximamente</Badge>}
                                {isPreSale && <Badge className="bg-green-400 text-black">Preventa</Badge>}
                            </div>
                        )}
                        <Button className="bg-red-600 text-white w-full md:w-auto">Comprar Boletos</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};