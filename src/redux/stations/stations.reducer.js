const INITIAL_STATE = {
    stations: [],
    stationsAdmin: [],
    stationSelected: null,
    loading: false,
    error: null
}

export const stationsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "LOADING":
            return {...state, loading: true};
        case "CREATE_STATION":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "GET_STATIONS":
            return {
                ...state,
                stations: [...action.payload],
                loading: false,
                error: null
            };
        case "GET_STATIONS_ADMIN":
            return {
                ...state,
                stationsAdmin: action.payload,
                // stationsAdmin: [...action.payload],
                loading: false,
                error: null
            };
        case "SELECT_STATION":
            return {
                ...state,
                stationSelected: {...action.payload},
                loading: false,
                error: null
            }
        case "UPDATE_STATION":
            return {
                ...state,
                loading: false,
                error: null
            }
        case "DELETE_STATION":
            return {
                ...state,
                loading: false,
                error: null
            }
        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}