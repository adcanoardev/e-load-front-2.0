const INITIAL_STATE = {
    user: null,
    users: [],
    userSelected: null,
    token: null,
    loading: false,
    error: null
}

export const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return {...state, loading: true};
        case "CREATE_USER":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "GET_USERS":
            return {
                ...state,
                users: [...action.payload],
                loading: false,
                error: null
            }
        case "SELECT_USER":
            return {
                ...state,
                userSelected: {...action.payload},
                loading: false,
                error: null
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            };
        case "DELETE_USER":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null
            };
        case "CHECK_SESSION":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
                error: null
            };
        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}