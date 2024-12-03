import { Gender, MovieGender } from "@/interfaces/models/gender.interface";
import instance from './base.api';

export const genderApi = {
    getAll: function () {
        return instance.get<Gender[]>('gender/getAll');
    },
    getMoviesByGender: function (id: number) {
        return instance.get<MovieGender[]>(`movie/getByGenderId/${id}`);
    },
}