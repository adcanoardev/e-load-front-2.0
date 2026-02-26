import { API } from "../../shared/Api";
import store from "../store";

const { dispatch } = store;

const createSpot = async (dataSpot) => {
    try {
        // dispatch({type: "LOADING"});
        const formData = new FormData();
        formData.append("power", dataSpot.power);
        formData.append("type", dataSpot.type);
        formData.append("rate", dataSpot.rate);
        formData.append("state", dataSpot.state);
        formData.append("station", dataSpot.station);
        const result = await API.post("spots", formData);
        dispatch({
            type: "CREATE_SPOT",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const getAllSpots = async () => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.get("spots");
        dispatch({
            type: "GET_SPOTS",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const getSpotsByStation = async (stationId) => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.get(`spots/station/${stationId}`);
        dispatch({
            type: "STATION_SPOTS",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const getSpotsByUser = async (userId) => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.get(`spots/user/${userId}`);
        dispatch({
            type: "USER_SPOTS",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const updateSpot = async (spotId, spotToUpdate) => {
    try {
        // dispatch({type: "LOADING"});
        const formData = new FormData();
        formData.append("rate", spotToUpdate.rate);
        formData.append("state", spotToUpdate.state);
        const result = await API.put(`spots/${spotId}`, formData);
        dispatch({
            type: "UPDATE_SPOT",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const updateSpotState = async (spotId, newState) => {
    try {
        const result = await API.patch(`spots/${spotId}`, { state: newState });
        if (newState === "Ocupado") {
            dispatch({
                type: "SELECT_SPOT_TO_LOAD",
                payload: result.data,
            });
        } else if (newState === "Libre") {
            dispatch({
                type: "SELECT_SPOT_TO_DISCONNECT",
                payload: null,
            });
        }
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const spotLoading = async (spotId, loadValue) => {
    try {
        const result = await API.patch(`spots/${spotId}`, { load: loadValue });
        dispatch({
            type: "SELECT_SPOT_TO_LOAD",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const loadingSpot = () => {
    let value = 0;
    const interval = setInterval(() => {
        value = value + 5;
        console.log(value);
    }, 1000);
    return () => {
        clearInterval(interval);
    };
};
const deleteSpot = async (spotId) => {
    try {
        // dispatch({type: "LOADING"});
        const result = await API.delete(`spots/${spotId}`);
        dispatch({
            type: "DELETE_SPOT",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const deleteAllSpotsFromStation = async (stationId) => {
    getSpotsByStation(stationId);
    //comprobar el initial_state spotsByStation para poder borrarlos
};

export {
    createSpot,
    getAllSpots,
    getSpotsByStation,
    getSpotsByUser,
    updateSpot,
    updateSpotState,
    spotLoading,
    loadingSpot,
    deleteSpot,
    deleteAllSpotsFromStation,
};
