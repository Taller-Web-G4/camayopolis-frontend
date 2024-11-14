import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MovieForm from "@/components/admin/peliculas/MovieForm";
import { MovieDetails } from '@/interfaces/models/movieDetails.interface';
import { movieApi } from '@/api/backend';

interface MovieDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    movie: MovieDetails | null;
}

export const MovieDialog: React.FC<MovieDialogProps> = ({ isOpen, onClose, onSave, movie }) => {
    const handleSave = async (data: MovieDetails) => {
        try {
            if (movie) {
                await movieApi.update(movie.id, data);
            } else {
                await movieApi.create(data);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Error al guardar la película:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{movie ? 'Editar Película' : 'Crear Película'}</DialogTitle>
                </DialogHeader>
                <MovieForm
                    movie={movie}
                    onCancel={onClose}
                    onSave={handleSave}
                />
            </DialogContent>
        </Dialog>
    );
};
