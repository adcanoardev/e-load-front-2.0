import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_URL_API || "http://localhost:8000/api/";

export const api = axios.create({ baseURL: BASE_URL });
export const apiMultipart = axios.create({ baseURL: BASE_URL });

const attachToken = (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
};

api.interceptors.request.use(attachToken);
apiMultipart.interceptors.request.use(attachToken);

// Redirigir al home si el token expira
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
        return Promise.reject(err);
    }
);
