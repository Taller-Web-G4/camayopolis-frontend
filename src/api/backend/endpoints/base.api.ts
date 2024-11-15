import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

instance.interceptors.request.use(
    (request) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('jwtToken');

            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
        }

        request.headers['Content-Type'] = 'application/json';
        return request;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data && error.response.data.message === 'Token invalid - Not authorized') {
            localStorage.removeItem('jwtToken');
        }
        return Promise.reject(error);
    }
);

export default instance;