const INITIAL_STATE = {
    spots: [],
    spotsByStation: [],
    spotsByUser: [],
    spotToCharge: null,
    loading: false,
    error: null
}

export const spotsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return {...state, loading: true};
        case "CREATE_SPOT":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "GET_SPOTS":
            return {
                ...state,
                spots: [...action.payload],
                loading: false,
                error: null
            };
        case "STATION_SPOTS":
            return {
                ...state,
                spotsByStation: [...action.payload],
                loading: false,
                error: null
            };
        case "USER_SPOTS":
            return {
                ...state,
                spotsByUser: [...action.payload],
                loading: false,
                error: null
            };
        case "SELECT_SPOT_TO_LOAD":
            return {
                ...state,
                spotToCharge: {...action.payload},
                loading: false,
                error: null
            }
        case "SELECT_SPOT_TO_DISCONNECT":
            return {
                ...state,
                spotToCharge: action.payload,
                loading: false,
                error: null
            };
        case "UPDATE_SPOT":
            return {
                ...state,
                loading: false,
                error: null
            }
        case "DELETE_SPOT":
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