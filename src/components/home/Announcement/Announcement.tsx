'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

export const Announcement = () => {
    const images: string[] = [
        "/1.jpg",
        "/2.jpeg",
        "/3.jpeg",
        "/4.jpeg",
        "/5.jpg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    useEffect(() => {
        if (!carouselApi) return;

        const handleSelect = () => {
            setCurrentIndex(carouselApi.selectedScrollSnap());
        };

        carouselApi.on('select', handleSelect);

        return () => {
            carouselApi.off('select', handleSelect);
        };
    }, [carouselApi]);

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            setApi={setCarouselApi}  // Guardar referencia al API del carrusel
            className="relative w-full h-[75vh] overflow-hidden" // Cambiado de w-screen a w-full
        >
            <CarouselContent className="flex h-full"> {/* Añadido w-full */}
                {images.map((src, index) => (
                    <CarouselItem key={index} className="w-full h-full flex-shrink-0 pl-0"> {/* Ajustado w-full y h-full */}
                        <img
                            src={src}
                            alt={`Anuncio ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Botones de navegación */}
            <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-2" />
            <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-2" />

            {/* Indicadores de puntos */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                            currentIndex === index ? 'bg-black' : 'bg-gray-400'
                        }`}
                        onClick={() => carouselApi?.scrollTo(index)}
                    />
                ))}
            </div>
        </Carousel>
    );
}
