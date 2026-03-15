import { configureStore } from "@reduxjs/toolkit";
import { usersReducer }    from "./slices/usersSlice";
import { stationsReducer } from "./slices/stationsSlice";
import { spotsReducer }    from "./slices/spotsSlice";
import { commentsReducer, paymentsReducer } from "./slices/otherSlices";

export default configureStore({
    reducer: {
        users:    usersReducer,
        stations: stationsReducer,
        spots:    spotsReducer,
        comments: commentsReducer,
        payments: paymentsReducer,
    },
});
