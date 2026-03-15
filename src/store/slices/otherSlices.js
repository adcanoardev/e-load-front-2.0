import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentsApi, paymentsApi } from "../../api/endpoints";

// ─── Comments thunks ──────────────────────────────────────────────────────────
export const getAllCommentsThunk = createAsyncThunk(
    "comments/getAll",
    async (_, { rejectWithValue }) => {
        try { return (await commentsApi.getAll()).data; }
        catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
    }
);

export const getCommentsByStationThunk = createAsyncThunk(
    "comments/getByStation",
    async (id, { rejectWithValue }) => {
        try { return (await commentsApi.getByStation(id)).data; }
        catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
    }
);

export const createCommentThunk = createAsyncThunk(
    "comments/create",
    async (data, { rejectWithValue }) => {
        try { return (await commentsApi.create(data)).data; }
        catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
    }
);

export const deleteCommentThunk = createAsyncThunk(
    "comments/delete",
    async (id, { rejectWithValue }) => {
        try { await commentsApi.remove(id); return id; }
        catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
    }
);

// ─── Comments slice ───────────────────────────────────────────────────────────
const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
        commentsByStation: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCommentsThunk.fulfilled, (state, { payload }) => {
                state.comments = [...payload].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            })
            .addCase(getCommentsByStationThunk.fulfilled, (state, { payload }) => {
                state.commentsByStation = [...payload].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            })
            .addCase(createCommentThunk.fulfilled, (state, { payload }) => {
                state.commentsByStation = [payload, ...state.commentsByStation];
            })
            .addCase(deleteCommentThunk.fulfilled, (state, { payload }) => {
                state.comments = state.comments.filter(c => c._id !== payload);
                state.commentsByStation = state.commentsByStation.filter(c => c._id !== payload);
            });
    },
});

export const commentsReducer = commentsSlice.reducer;

// ─── Payments thunks ──────────────────────────────────────────────────────────
export const getPaymentsByUserThunk = createAsyncThunk(
    "payments/getByUser",
    async (userId, { rejectWithValue }) => {
        try { return (await paymentsApi.getByUser(userId)).data; }
        catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
    }
);

export const createPaymentThunk = createAsyncThunk(
    "payments/create",
    async (data, { rejectWithValue, dispatch, getState }) => {
        try {
            const res    = await paymentsApi.create(data);
            const userId = getState().users.user._id;
            dispatch(getPaymentsByUserThunk(userId));
            return res.data;
        } catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
    }
);

export const deletePaymentThunk = createAsyncThunk(
    "payments/delete",
    async ({ id, userId }, { rejectWithValue, dispatch }) => {
        try {
            await paymentsApi.remove(id);
            dispatch(getPaymentsByUserThunk(userId));
            return id;
        } catch (err) { return rejectWithValue(err.response?.data?.error || "Error"); }
    }
);

// ─── Payments slice ───────────────────────────────────────────────────────────
const paymentsSlice = createSlice({
    name: "payments",
    initialState: {
        payments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentsByUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPaymentsByUserThunk.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.payments = payload;
            })
            .addCase(getPaymentsByUserThunk.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const paymentsReducer = paymentsSlice.reducer;
