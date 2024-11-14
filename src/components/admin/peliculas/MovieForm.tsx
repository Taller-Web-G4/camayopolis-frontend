import React from 'react';
import { useForm } from 'react-hook-form';
import { MovieDetails, MovieDetailsInit } from '@/interfaces/models/movieDetails.interface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface MovieDetailsFormProps {
    movie: MovieDetails | null;
    onSave: (data: MovieDetails) => void;
    onCancel: () => void;
}

const MovieDetailsForm: React.FC<MovieDetailsFormProps> = ({ movie, onSave, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<MovieDetails>({
        defaultValues: movie || MovieDetailsInit,
    });

    const onSubmit = (data: MovieDetails) => {
        onSave(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Título */}
            <div>
                <label className="block font-medium">Título</label>
                <Input {...register('title', { required: 'Este campo es requerido' })} />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>

            {/* Sinopsis */}
            <div>
                <label className="block font-medium">Sinopsis</label>
                <Input {...register('synopsis', { required: 'Este campo es requerido' })} />
                {errors.synopsis && <span className="text-red-500">{errors.synopsis.message}</span>}
            </div>

            {/* Fecha de Estreno */}
            <div>
                <label className="block font-medium">Fecha de Estreno</label>
                <Input type="date" {...register('openingDate', { required: 'Este campo es requerido' })} />
                {errors.openingDate && <span className="text-red-500">{errors.openingDate.message}</span>}
            </div>

            {/* Duración */}
            <div>
                <label className="block font-medium">Duración (minutos)</label>
                <Input type="number" {...register('runtime', { required: 'Este campo es requerido', min: 1 })} />
                {errors.runtime && <span className="text-red-500">{errors.runtime.message}</span>}
            </div>

            {/* URL del Póster */}
            <div>
                <label className="block font-medium">URL del Póster</label>
                <Input {...register('posterUrl', { required: 'Este campo es requerido' })} />
                {errors.posterUrl && <span className="text-red-500">{errors.posterUrl.message}</span>}
            </div>

            {/* Trailer */}
            <div>
                <label className="block font-medium">Trailer</label>
                <Input {...register('trailer')} />
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                    <Checkbox {...register('isComingSoon')} />
                    <span className="ml-2">Próximamente</span>
                </label>
                <label className="flex items-center">
                    <Checkbox {...register('isNewRelease')} />
                    <span className="ml-2">Nuevo Lanzamiento</span>
                </label>
                <label className="flex items-center">
                    <Checkbox {...register('isPreSale')} />
                    <span className="ml-2">Preventa</span>
                </label>
                <label className="flex items-center">
                    <Checkbox {...register('isInTheater')} />
                    <span className="ml-2">En Cine</span>
                </label>
            </div>

            {/* Categoría */}
            <div>
                <label className="block font-medium">Categoría</label>
                <Input {...register('category')} placeholder="Ej. Animación, Aventura" />
            </div>

            {/* Botones */}
            <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" className="ml-2">
                    Guardar
                </Button>
            </div>
        </form>
    );
};

export default MovieDetailsForm;
