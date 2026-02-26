import axios from "axios";

export const APIHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": localStorage.getItem("token")  
}
export const APIHeaders2 = {
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Authorization": localStorage.getItem("token")
}
export const APIIMAGES = axios.create({
    baseURL: import.meta.env.VITE_APP_URL_API,
    headers: APIHeaders2
});
export const API = axios.create({
    baseURL: import.meta.env.VITE_APP_URL_API,
    headers: APIHeaders
});


