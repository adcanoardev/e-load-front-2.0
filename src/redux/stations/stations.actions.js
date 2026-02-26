import { API } from "../../shared/Api";
import store from "../store";

const { dispatch } = store;

const createStation = async (dataStation) => {
    try {
        dispatch({ type: "LOADING" });
        const formData = new FormData();
        formData.append("coordinatesLat", dataStation.coordinatesLat);
        formData.append("coordinatesLng", dataStation.coordinatesLng);
        formData.append("address", dataStation.address);
        formData.append("schedule", dataStation.schedule);
        const result = await API.post("stations", formData);
        dispatch({
            type: "CREATE_STATION",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const getAllStations = async () => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.get("stations");
        dispatch({
            type: "GET_STATIONS",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};

//meter-otro-state-para-admin-stations
const getAllStationsAdmin = async () => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.get("stations/stations-admin/");
        dispatch({
            type: "GET_STATIONS_ADMIN",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const getStationById = async (stationId) => {
    try {
        // dispatch({type: "LOADING"});
        const result = await API.get(`stations/${stationId}`);
        dispatch({
            type: "SELECT_STATION",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const updateStation = async (stationId, stationToUpdate) => {
    try {
        dispatch({ type: "LOADING" });
        const formData = new FormData();
        formData.append("schedule", stationToUpdate.schedule);
        const result = await API.put(`stations/${stationId}`, formData);
        dispatch({
            type: "UPDATE_STATION",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const deleteStation = async (stationId) => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.delete(`stations/${stationId}`);
        dispatch({
            type: "DELETE_STATION",
            payload: result.data,
        });
        getAllStationsAdmin();
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};

export { createStation, getAllStations, getAllStationsAdmin, getStationById, updateStation, deleteStation };
