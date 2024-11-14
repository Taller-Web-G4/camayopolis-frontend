import React from 'react';
import { MovieDetails } from '@/interfaces/models/movieDetails.interface';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface DataTableProps {
    data: MovieDetails[];
    onEdit: (movie: MovieDetails) => void;
    onDelete: (id: number) => void;
    isLoading?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete, isLoading }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="px-6 py-3 text-left">Título</th>
                    <th className="px-6 py-3 text-left">Fecha de Estreno</th>
                    <th className="px-6 py-3 text-left">Duración</th>
                    <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                    <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                            Cargando datos...
                        </td>
                    </tr>
                ) : data.length > 0 ? (
                    data.map((movie) => (
                        <tr key={movie.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-700">{movie.title}</td>
                            <td className="px-6 py-4 text-gray-700">
                                {format(new Date(movie.openingDate), 'dd/MM/yyyy')}
                            </td>
                            <td className="px-6 py-4 text-gray-700">{movie.runtime} min</td>
                            <td className="px-6 py-4 text-center">
                                <TableActions movie={movie} onEdit={onEdit} onDelete={onDelete} />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                            No hay datos disponibles.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

interface TableActionsProps {
    movie: MovieDetails;
    onEdit: (movie: MovieDetails) => void;
    onDelete: (id: number) => void;
}

const TableActions: React.FC<TableActionsProps> = ({ movie, onEdit, onDelete }) => (
    <div className="flex justify-center space-x-2">
        <Button variant="outline" onClick={() => onEdit(movie)}>
            Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(movie.id)}>
            Eliminar
        </Button>
    </div>
);
