import { configureStore } from "@reduxjs/toolkit";
import { commentsReducer } from "./comments/comments.reducer";
import { spotsReducer } from "./spots/spots.reducer";
import { stationsReducer } from "./stations/stations.reducer";
import { usersReducer } from "./users/users.reducer";
import { paymentsReducer } from "./payments/payments.reducer";

export default configureStore({
    reducer: {
        comments: commentsReducer,
        spots: spotsReducer,
        stations: stationsReducer,
        users: usersReducer,
        payments: paymentsReducer
    }
})