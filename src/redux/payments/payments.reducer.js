const INITIAL_STATE = {
    payments: [],
    loading: false,
    error: null
}

export const paymentsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return {...state, loading: true};
        case "CREATE_PAYMENT":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "GET_PAYMENTS":
            return {
                ...state,
                payments: [...action.payload],
                loading: false,
                error: null
            };
                 
        case "DELETE_PAYMENT":
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