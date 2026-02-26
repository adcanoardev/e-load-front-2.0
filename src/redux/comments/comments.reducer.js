const INITIAL_STATE = {
    comments: [],
    commentsByStation: [],
    commentsByUser: [],
    loading: false,
    error: null,
};

export const commentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };
        case "CREATE_COMMENT":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "GET_COMMENTS":
            return {
                ...state,
                comments: [...action.payload],
                loading: false,
                error: null,
            };
        case "STATION_COMMENTS":
            return {
                ...state,
                commentsByStation: [...action.payload],
                loading: false,
                error: null,
            };
        case "USER_COMMENTS":
            return {
                ...state,
                commentsByUser: [...action.payload],
                loading: false,
                error: null,
            };
        case "DELETE_COMMENT":
            return {
                ...state,
                loading: false,
                error: null,
            };
        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
