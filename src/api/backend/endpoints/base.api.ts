import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

instance.interceptors.request.use(
    (request) => {
        let token;
        if (typeof window !== 'undefined') {
            // Lado del cliente
            token = localStorage.getItem('jwtToken') || undefined;
        } else {
            // Lado del servidor, se espera que el token se pase como parámetro
            token = request.headers['jwtToken'] || undefined;
        }

        if (token !== undefined) {
            request.headers.Authorization = "Bearer " + token;
        }
        request.headers["Content-Type"] = 'application/json';
        return request;
    },
    (error) => error
);

export default instance;