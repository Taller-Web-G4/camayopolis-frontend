import {Credential} from '@/interfaces';
import instance from './base.api';

export const auth = {
    login: function (credential: Credential) {
        return instance.post('auth/login', credential)
    },
    register: function (credential: Credential) {
        return instance.post('auth/register', credential)
    },
}