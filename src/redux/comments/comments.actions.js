import { API } from "../../shared/Api.js";
import store from "../store";

const { dispatch } = store;

const createComment = async (dataComment, user) => {
    try {
        dispatch({type: "LOADING"});
        const formData = new FormData();
        formData.append("user", user);
        formData.append("body", dataComment.body);
        const result = await API.post("comments", formData);
        dispatch({
            type: "CREATE_COMMENT",
            payload: result.data
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
}

const getAllComments = async () => {
    try {
        dispatch({type: "LOADING"});
        const result = await API.get("comments");
        const sortedComments = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        dispatch({
            type: "GET_COMMENTS",
            payload: sortedComments
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
}
const getCommentsByStation = async (stationId) => {
    try {
        dispatch({type: "LOADING"});
        const result = await API.get(`/comments/station/${stationId}`);
        const sortedComments = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        dispatch({
            type: "STATION_COMMENTS",
            payload: sortedComments
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
}
const getCommentsByUser = async (comments, user) => {
    try {
        dispatch({type: "LOADING"});
        const result = comments.filter((comment) => comment.user === user._id);
        dispatch({
            type: "USER_COMMENTS",
            payload: result.data
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
}
const deleteComment = async (commentId) => {
    try {
        dispatch({type: "LOADING"});
        const result = await API.delete(`comments/${commentId}`);
        dispatch({
            type: "DELETE_POST",
            payload: result.data
        });
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
}
const deleteAllCommentsFromUser = async (comments) => {
    try {
        for (const comment of comments) {
            deleteComment(comment._id);
        }
    } catch (error) {
        const errorMessage = error.response.data.msg;
        dispatch({ type: "ERROR", payload: errorMessage });
    }
}
export {
    createComment,
    getAllComments,
    getCommentsByStation,
    getCommentsByUser,
    deleteComment,
    deleteAllCommentsFromUser
}