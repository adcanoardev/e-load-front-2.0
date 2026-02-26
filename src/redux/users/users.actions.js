import { API, APIIMAGES } from "../../shared/Api";
import store from "../store";

const { dispatch } = store;

const login = async (dataLogin) => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.post("users/login", dataLogin);
        dispatch({
            type: "LOGIN",
            payload: {
                user: result.data.userToLog,
                token: result.data.token,
            },
        });
        localStorage.setItem("token", result.data.token);
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const createUser = async (dataRegister, navigate) => {
    try {
        dispatch({ type: "LOADING" });
        const formData = new FormData();
        formData.append("username", dataRegister.username);
        formData.append("name", dataRegister.name);
        formData.append("surnames", dataRegister.surnames);
        formData.append("email", dataRegister.email);
        if (dataRegister.image[0]) {
            formData.append("image", dataRegister.image[0]);
        }
        formData.append("password", dataRegister.password);
        const result = await APIIMAGES.post("users", formData);
        dispatch({
            type: "CREATE_USER",
            payload: result.data,
        });
        const user = {
            username: dataRegister.username,
            password: dataRegister.password,
        };
        login(user);
        navigate("/");
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const getAllUsers = async () => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.get("users");
        dispatch({
            type: "GET_USERS",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const getUserById = async (userId) => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.get(`users/${userId}`);
        dispatch({
            type: "SELECT_USER",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const updateUser = async (userId, userToUpdate) => {
    try {
        dispatch({ type: "LOADING" });
        const formData = new FormData();
        formData.append("name", userToUpdate.name);
        formData.append("surnames", userToUpdate.surnames);
        formData.append("email", userToUpdate.email);
        if (userToUpdate.image[0]) {
            formData.append("image", userToUpdate.image[0]);
        }
        if (userToUpdate.password) {
            formData.append("password", userToUpdate.password);
        }
        const result = await APIIMAGES.put(`users/${userId}`, formData);
        dispatch({
            type: "UPDATE_USER",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const updateUserSpots = async (userId, spotId, stationId) => {
    try {
        const date = new Date().toLocaleDateString();
        const result = await API.patch(`users/${userId}`, {
            $push: { spots: { date: date, spot: spotId, station: stationId } },
        });
        dispatch({
            type: "UPDATE_USER",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const updateUserPoints = async (userId, loyaltyPoints) => {
    try {
        const result = await API.patch(`users/${userId}`, { points: loyaltyPoints });
        dispatch({
            type: "UPDATE_USER",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const deleteUser = async (userId) => {
    try {
        dispatch({ type: "LOADING" });
        const result = await API.delete(`users/${userId}`);
        dispatch({
            type: "DELETE_USER",
            payload: result.data,
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};
const checkSession = async () => {
    try {
        const result = await API.get("users/check");
        dispatch({
            type: "CHECK_SESSION",
            payload: {
                user: result.data !== "No estás autorizado" ? result.data : null,
                token: localStorage.getItem("token"),
            },
        });
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response.data });
    }
};
const logout = async () => {
    try {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
};

export {
    login,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    updateUserSpots,
    updateUserPoints,
    deleteUser,
    checkSession,
    logout,
};
