import axios from "axios";

const baseURL = import.meta.env.VITE_APP_URL_API; // ej: "http://localhost:5000/"

// Headers base (SIN Authorization y SIN Access-Control-Allow-Origin)
export const APIHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export const APIHeaders2 = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
};

// Clients
export const API = axios.create({
    baseURL,
    headers: APIHeaders,
});

export const APIIMAGES = axios.create({
    baseURL,
    headers: APIHeaders2,
});

// Interceptors: token siempre actualizado + Bearer
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

APIIMAGES.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
