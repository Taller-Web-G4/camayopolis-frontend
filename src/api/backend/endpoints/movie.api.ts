import instance from './base.api';
import { Movie } from '@/interfaces/models/movie.interface';

export const movieApi = {
    getMovieDetailed: function (id: number) {
        return instance.get<Movie>(`movie/getMovieDetailed/${id}`);
    }
}
