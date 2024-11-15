import instance from './base.api';
import { MovieDetails } from '@/interfaces/models/movieDetails.interface';

export const movieApi = {
    getMovieDetailed: function (id: number) {
        return instance.get<MovieDetails>(`movie/getMovieDetailed/${id}`);
    },
    getAll: function () {
        return instance.get<MovieDetails[]>('movie/getAll'); // Asegúrate de que devuelva MovieDetails[]
    },
    getById: function (id: number) {
        return instance.get<MovieDetails>(`movie/getById/${id}`);
    },
    update: function (id: number, movieData: Partial<MovieDetails>) {
        return instance.put(`movie/update/${id}`, movieData);
    },
    create: function (movie: Omit<MovieDetails, 'id'>) {
        return instance.post('movie/create', movie);
    },
    delete: function (id: number) {
        return instance.delete(`movie/delete/${id}`);
    },
};
