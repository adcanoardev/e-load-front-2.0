const INITIAL_STATE = {
    spots: [],
    spotsByStation: [],
    spotsByUser: [],
    spotToCharge: null,
    loading: false,
    error: null,
};

export const spotsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true };

        case "GET_SPOTS":
            return {
                ...state,
                spots: [...action.payload],
                loading: false,
                error: null,
            };

        case "STATION_SPOTS":
            return {
                ...state,
                spotsByStation: [...action.payload],
                loading: false,
                error: null,
            };

        case "USER_SPOTS":
            return {
                ...state,
                spotsByUser: [...action.payload],
                loading: false,
                error: null,
            };

        case "CREATE_SPOT": {
            const created = action.payload;
            return {
                ...state,
                spots: created ? [created, ...state.spots] : state.spots,
                spotsByStation: created && created.station ? [created, ...state.spotsByStation] : state.spotsByStation,
                loading: false,
                error: null,
            };
        }

        case "UPDATE_SPOT": {
            const updated = action.payload;
            if (!updated?._id) {
                return { ...state, loading: false, error: null };
            }
            const replace = (arr) => arr.map((s) => (s._id === updated._id ? updated : s));
            return {
                ...state,
                spots: replace(state.spots),
                spotsByStation: replace(state.spotsByStation),
                spotsByUser: replace(state.spotsByUser),
                spotToCharge: state.spotToCharge?._id === updated._id ? updated : state.spotToCharge,
                loading: false,
                error: null,
            };
        }

        case "DELETE_SPOT": {
            const deleted = action.payload;
            const deletedId = deleted?._id || action.payload; // por si mandas solo el id
            const filterOut = (arr) => arr.filter((s) => s._id !== deletedId);

            return {
                ...state,
                spots: filterOut(state.spots),
                spotsByStation: filterOut(state.spotsByStation),
                spotsByUser: filterOut(state.spotsByUser),
                spotToCharge: state.spotToCharge?._id === deletedId ? null : state.spotToCharge,
                loading: false,
                error: null,
            };
        }

        case "SELECT_SPOT_TO_LOAD":
            return {
                ...state,
                spotToCharge: { ...action.payload },
                loading: false,
                error: null,
            };

        case "SELECT_SPOT_TO_DISCONNECT":
            return {
                ...state,
                spotToCharge: action.payload,
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
